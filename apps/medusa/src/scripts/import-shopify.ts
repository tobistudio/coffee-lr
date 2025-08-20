import { createProductsWorkflow } from '@medusajs/core-flows';
import type { ExecArgs } from '@medusajs/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';

interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  handle: string;
  price: string;
  images: Array<{ src: string; alt?: string }>;
  variants: Array<{
    id: number;
    title: string;
    price: string;
    option1?: string;
  }>;
  options: Array<{
    name: string;
    values: string[];
  }>;
}

export default async function importShopifyProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  
  const shopifyDomain = process.env.SHOPIFY_DOMAIN;
  const shopifyPassword = process.env.SHOPIFY_PASSWORD;
  
  if (!shopifyDomain || !shopifyPassword) {
    logger.error('SHOPIFY_DOMAIN and SHOPIFY_PASSWORD environment variables are required');
    return;
  }

  logger.info('Starting Shopify product import...');

  try {
    // Fetch products from Shopify
    const response = await fetch(`https://${shopifyDomain}/admin/api/2023-10/products.json`, {
      headers: {
        'X-Shopify-Access-Token': shopifyPassword,
      },
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const shopifyProducts: ShopifyProduct[] = data.products;

    logger.info(`Found ${shopifyProducts.length} products in Shopify`);

    // Convert Shopify products to Medusa format
    const medusaProducts = shopifyProducts
      .filter(product => product.variants && product.variants.length > 0)
      .map(product => {
        const firstVariant = product.variants[0];
        const price = parseFloat(firstVariant.price);
        
        return {
          title: product.title,
          description: product.body_html?.replace(/<[^>]*>/g, '') || '', // Strip HTML tags
          handle: product.handle,
          status: 'published' as const,
          thumbnail: product.images?.[0]?.src || '',
          images: product.images?.map(img => ({
            url: img.src,
            alt: img.alt || product.title,
          })) || [],
          options: product.options?.map(option => ({
            title: option.name,
            values: option.values,
          })) || [
            {
              title: 'Default',
              values: ['Default'],
            },
          ],
          variants: product.variants.map(variant => ({
            title: variant.title,
            sku: `shopify-${variant.id}`,
            manage_inventory: false,
            options: variant.option1 ? {
              [product.options?.[0]?.name || 'Default']: variant.option1,
            } : {
              'Default': 'Default',
            },
            prices: [
              {
                amount: Math.round(parseFloat(variant.price) * 100), // Convert to cents
                currency_code: 'usd',
              },
            ],
          })),
        };
      });

    logger.info(`Converting ${medusaProducts.length} products for import`);

    // Import products using Medusa workflow
    if (medusaProducts.length > 0) {
      const { result } = await createProductsWorkflow(container).run({
        input: {
          products: medusaProducts,
        },
      });

      logger.info(`Successfully imported ${result.length} products from Shopify`);
    } else {
      logger.warn('No valid products found to import');
    }

  } catch (error) {
    logger.error('Error importing Shopify products:', error);
    throw error;
  }
}
