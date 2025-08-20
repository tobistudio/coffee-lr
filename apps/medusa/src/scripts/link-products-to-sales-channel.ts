import { linkProductsToSalesChannelWorkflow } from '@medusajs/core-flows';
import type { ExecArgs } from '@medusajs/types';
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils';

export default async function linkProductsToSalesChannel({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const productModuleService = container.resolve(Modules.PRODUCT);

  logger.info('Linking products to sales channel...');

  try {
    // Get the default sales channel
    const salesChannels = await salesChannelModuleService.listSalesChannels({
      name: 'Default Sales Channel',
    });

    if (!salesChannels.length) {
      logger.error('No default sales channel found');
      return;
    }

    const defaultSalesChannel = salesChannels[0];
    logger.info(`Found default sales channel: ${defaultSalesChannel.name} (${defaultSalesChannel.id})`);

    // Get all published products
    const products = await productModuleService.listProducts({
      status: 'published',
    });

    logger.info(`Found ${products.length} published products`);

    // Get products that are not linked to the default sales channel
    // We'll check the database directly since the relation isn't available in the module
    const remoteLink = container.resolve(ContainerRegistrationKeys.LINK);
    
    const productsToLink = [];
    for (const product of products) {
      // Check if product is already linked to the sales channel
      const existingLinks = await remoteLink.list('product_sales_channel', {
        product_id: product.id,
        sales_channel_id: defaultSalesChannel.id,
      });
      
      if (existingLinks.length === 0) {
        productsToLink.push(product);
        logger.info(`Product "${product.title}" needs to be linked to sales channel`);
      }
    }

    if (productsToLink.length === 0) {
      logger.info('All products are already linked to sales channels');
      return;
    }

    logger.info(`Linking ${productsToLink.length} products to default sales channel...`);

    // Link products to sales channel
    await linkProductsToSalesChannelWorkflow(container).run({
      input: {
        id: defaultSalesChannel.id,
        add: productsToLink.map(p => p.id),
      },
    });

    logger.info(`Successfully linked ${productsToLink.length} products to sales channel`);

  } catch (error) {
    logger.error('Error linking products to sales channel:', error);
    throw error;
  }
}
