import { CreateProductWorkflowInputDTO, ProductCollectionDTO, ProductTagDTO } from '@medusajs/framework/types';
import { ProductStatus } from '@medusajs/utils';

const buildBaseProductData = ({
  sales_channels,
  sku,
  prices: { usd, cad },
}: {
  sales_channels: { id: string }[];
  sku: string;
  prices: {
    usd: number;
    cad: number;
  };
}) => ({
  options: [
    {
      title: 'Grind',
      values: ['Whole Bean', 'Ground'],
    },
    {
      title: 'Size',
      values: ['16oz'],
    },
  ],
  sales_channels: sales_channels.map(({ id }) => ({
    id,
  })),
  variants: [
    {
      title: 'Whole Bean',
      sku: `${sku}-WHOLE-BEAN`,
      options: {
        Grind: 'Whole Bean',
        Size: '16oz',
      },
      manage_inventory: false,
      prices: [
        {
          amount: cad,
          currency_code: 'cad',
        },
        {
          amount: usd,
          currency_code: 'usd',
        },
      ],
    },
    {
      title: 'Ground',
      sku: `${sku}-GROUND`,
      options: {
        Grind: 'Ground',
        Size: '16oz',
      },
      manage_inventory: false,
      prices: [
        {
          amount: cad,
          currency_code: 'cad',
        },
        {
          amount: usd,
          currency_code: 'usd',
        },
      ],
    },
  ],
});

export const seedProducts = ({
  collections,
  tags,
  sales_channels,
  categories,
  shipping_profile_id,
}: {
  collections: ProductCollectionDTO[];
  tags: ProductTagDTO[];
  categories: { id: string; name: string }[];
  sales_channels: { id: string }[];
  shipping_profile_id: string;
}): CreateProductWorkflowInputDTO[] => [
  {
    title: 'Lavender Hill Springs Colombian Coffee - Medium Roast',
    description:
      'Experience the rich, smooth flavors of our Lavender Hill Springs Colombian Coffee, sourced from the high-altitude regions of Colombia. This medium roast offers a perfect balance of sweetness and acidity, with notes of caramel and a hint of citrus that creates a truly exceptional coffee experience.',
    handle: 'lavender-hill-springs-colombian-coffee',
    status: ProductStatus.PUBLISHED,
    category_ids: categories.filter(({ name }) => name === 'Single Origin').map(({ id }) => id),
    tag_ids: tags.filter((t) => ['Best Seller', 'Colombia'].includes(t.value)).map((t) => t.id),
    thumbnail: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/colombian-coffee.jpg',
    collection_id: collections.find(({ title }) => title === 'Medium Roasts')?.id,
    shipping_profile_id,
    images: [
      {
        url: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/colombian-coffee.jpg',
      },
    ],
    ...buildBaseProductData({
      sales_channels,
      sku: 'LAVENDER-HILL-SPRINGS-COLOMBIAN',
      prices: {
        usd: 18.0,
        cad: 24.0,
      },
    }),
  },
  {
    title: 'Lavender Hill Springs Ethiopian Coffee - Light Roast',
    description:
      'Discover the bright, floral notes of our Lavender Hill Springs Ethiopian Coffee, a light roast that showcases the unique terroir of Ethiopian beans. With its distinctive berry-like acidity and tea-like body, this coffee offers a refreshing and complex flavor profile that coffee enthusiasts will love.',
    handle: 'lavender-hill-springs-ethiopian-coffee',
    status: ProductStatus.PUBLISHED,
    collection_id: collections.find(({ title }) => title === 'Light Roasts')?.id,
    category_ids: categories.filter(({ name }) => name === 'Single Origin').map(({ id }) => id),
    tag_ids: tags.filter((t) => ['Best Seller', 'Ethiopia'].includes(t.value)).map((t) => t.id),
    thumbnail: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/ethiopian-coffee.jpg',
    shipping_profile_id,
    images: [
      {
        url: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/ethiopian-coffee.jpg',
      },
    ],
    ...buildBaseProductData({
      sales_channels,
      sku: 'LAVENDER-HILL-SPRINGS-ETHIOPIAN',
      prices: {
        usd: 20.0,
        cad: 27.0,
      },
    }),
  },
  {
    title: 'Lavender Hill Springs Mexican Coffee - Medium Roast',
    description:
      'Savor the rich, full-bodied flavors of our Lavender Hill Springs Mexican Coffee, sourced from the highlands of Mexico. This medium roast features a smooth, nutty profile with subtle chocolate notes and a gentle acidity that makes it perfect for any time of day.',
    handle: 'lavender-hill-springs-mexican-coffee',
    status: ProductStatus.PUBLISHED,
    collection_id: collections.find(({ title }) => title === 'Medium Roasts')?.id,
    category_ids: categories.filter(({ name }) => name === 'Single Origin').map(({ id }) => id),
    tag_ids: tags.filter((t) => ['Mexico'].includes(t.value)).map((t) => t.id),
    thumbnail: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/mexican-coffee.jpg',
    shipping_profile_id,
    images: [
      {
        url: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/mexican-coffee.jpg',
      },
    ],
    ...buildBaseProductData({
      sales_channels,
      sku: 'LAVENDER-HILL-SPRINGS-MEXICAN',
      prices: {
        usd: 19.0,
        cad: 25.0,
      },
    }),
  },
  {
    title: 'Lavender Hill Springs Guatemalan Coffee - Medium Roast',
    description:
      'Experience the complex flavors of our Lavender Hill Springs Guatemalan Coffee, sourced from the volcanic highlands of Guatemala. This medium roast offers a rich, chocolatey profile with notes of spice and a smooth, velvety finish that coffee connoisseurs will appreciate.',
    handle: 'lavender-hill-springs-guatemalan-coffee',
    status: ProductStatus.PUBLISHED,
    collection_id: collections.find(({ title }) => title === 'Medium Roasts')?.id,
    category_ids: categories.filter(({ name }) => name === 'Single Origin').map(({ id }) => id),
    tag_ids: tags.filter((t) => ['Guatemala'].includes(t.value)).map((t) => t.id),
    thumbnail: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/guatemalan-coffee.jpg',
    shipping_profile_id,
    images: [
      {
        url: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/guatemalan-coffee.jpg',
      },
    ],
    ...buildBaseProductData({
      sales_channels,
      sku: 'LAVENDER-HILL-SPRINGS-GUATEMALAN',
      prices: {
        usd: 21.0,
        cad: 28.0,
      },
    }),
  },
  {
    title: 'Lavender Hill Springs Birthday Cake Coffee - Medium Roast',
    description:
      'Celebrate every day with our Lavender Hill Springs Birthday Cake Coffee, a delightful medium roast infused with the sweet, nostalgic flavors of birthday cake. This unique blend combines the rich taste of coffee with hints of vanilla, buttercream, and a touch of celebration that makes every cup feel special.',
    handle: 'lavender-hill-springs-birthday-cake-coffee',
    collection_id: collections.find(({ title }) => title === 'Medium Roasts')?.id,
    category_ids: categories.filter(({ name }) => name === 'Blends').map(({ id }) => id),
    status: ProductStatus.PUBLISHED,
    tag_ids: tags.filter((t) => ['Best Seller'].includes(t.value)).map((t) => t.id),
    thumbnail: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/birthday-cake-coffee.jpg',
    shipping_profile_id,
    images: [
      {
        url: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/birthday-cake-coffee.jpg',
      },
    ],
    ...buildBaseProductData({
      sales_channels,
      sku: 'LAVENDER-HILL-SPRINGS-BIRTHDAY-CAKE',
      prices: {
        usd: 22.0,
        cad: 29.0,
      },
    }),
  },
  {
    title: 'Lavender Hill Springs Gingerbread Coffee - Medium Roast',
    description:
      'Embrace the holiday spirit year-round with our Lavender Hill Springs Gingerbread Coffee, a warm and comforting medium roast that captures the essence of freshly baked gingerbread. This aromatic blend features notes of ginger, cinnamon, molasses, and a hint of nutmeg that creates a cozy, festive experience.',
    handle: 'lavender-hill-springs-gingerbread-coffee',
    collection_id: collections.find(({ title }) => title === 'Medium Roasts')?.id,
    category_ids: categories.filter(({ name }) => name === 'Blends').map(({ id }) => id),
    status: ProductStatus.PUBLISHED,
    tag_ids: tags.filter((t) => ['Best Seller'].includes(t.value)).map((t) => t.id),
    thumbnail: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/gingerbread-coffee.jpg',
    shipping_profile_id,
    images: [
      {
        url: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/gingerbread-coffee.jpg',
      },
    ],
    ...buildBaseProductData({
      sales_channels,
      sku: 'LAVENDER-HILL-SPRINGS-GINGERBREAD',
      prices: {
        usd: 23.0,
        cad: 30.0,
      },
    }),
  },
  {
    title: 'Lavender Hill Springs Yogi Blend - Light Roast',
    description:
      'Find your zen with our Lavender Hill Springs Yogi Blend, a light roast crafted for mindful moments and peaceful contemplation. This harmonious blend combines smooth, gentle flavors with a subtle sweetness that promotes relaxation and inner calm, perfect for meditation or quiet reflection.',
    handle: 'lavender-hill-springs-yogi-blend',
    collection_id: collections.find(({ title }) => title === 'Light Roasts')?.id,
    category_ids: categories.filter(({ name }) => name === 'Blends').map(({ id }) => id),
    status: ProductStatus.PUBLISHED,
    tag_ids: tags.filter((t) => ['Best Seller'].includes(t.value)).map((t) => t.id),
    thumbnail: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/yogi-blend.jpg',
    shipping_profile_id,
    images: [
      {
        url: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/yogi-blend.jpg',
      },
    ],
    ...buildBaseProductData({
      sales_channels,
      sku: 'LAVENDER-HILL-SPRINGS-YOGI-BLEND',
      prices: {
        usd: 24.0,
        cad: 31.0,
      },
    }),
  },
  {
    title: 'Lavender Hill Springs Silver Bullet Coffee - Dark Roast',
    description:
      'Unleash the power of our Lavender Hill Springs Silver Bullet Coffee, a bold dark roast designed for those who demand intensity and strength. This robust blend delivers a powerful punch of rich, deep flavors with a smooth finish that will energize your day and keep you focused.',
    handle: 'lavender-hill-springs-silver-bullet-coffee',
    collection_id: collections.find(({ title }) => title === 'Dark Roasts')?.id,
    category_ids: categories.filter(({ name }) => name === 'Blends').map(({ id }) => id),
    status: ProductStatus.PUBLISHED,
    tag_ids: tags.filter((t) => ['Best Seller'].includes(t.value)).map((t) => t.id),
    thumbnail: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/silver-bullet-coffee.jpg',
    shipping_profile_id,
    images: [
      {
        url: 'https://lambdacurrysites.s3.us-east-1.amazonaws.com/lavender-hill-springs/silver-bullet-coffee.jpg',
      },
    ],
    ...buildBaseProductData({
      sales_channels,
      sku: 'LAVENDER-HILL-SPRINGS-SILVER-BULLET',
      prices: {
        usd: 25.0,
        cad: 32.0,
      },
    }),
  },
];
