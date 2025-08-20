const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Mock store regions endpoint
app.get('/store/regions', (req, res) => {
  res.json({
    regions: [
      {
        id: 'reg_mock',
        name: 'United States',
        currency_code: 'USD',
        tax_rate: 0,
        payment_providers: [
          {
            id: 'stripe',
            is_installed: true
          }
        ],
        fulfillment_providers: [
          {
            id: 'manual',
            is_installed: true
          }
        ],
        countries: [
          {
            id: 'us',
            iso_2: 'US',
            iso_3: 'USA',
            name: 'United States',
            display_name: 'United States',
            region_id: 'reg_mock'
          }
        ]
      }
    ]
  });
});

// Mock customers/me endpoint
app.get('/store/customers/me', (req, res) => {
  res.json({
    customer: null
  });
});

// Mock store endpoint
app.get('/store', (req, res) => {
  res.json({
    store: {
      id: 'store_mock',
      name: 'Coffee Shop Demo',
      supported_currencies: [
        {
          code: 'USD',
          symbol: '$'
        }
      ],
      default_currency_code: 'USD',
      default_region_id: 'reg_mock'
    }
  });
});

// Mock collections endpoint
app.get('/store/collections', (req, res) => {
  res.json({
    collections: [
      {
        id: 'col_mock',
        title: 'Coffee Beans',
        handle: 'coffee-beans',
        products: []
      }
    ]
  });
});

// Mock products endpoint
app.get('/store/products', (req, res) => {
  res.json({
    products: [
      {
        id: 'prod_mock',
        title: 'Ethiopian Coffee',
        handle: 'ethiopian-coffee',
        status: 'published',
        description: 'Premium Ethiopian coffee beans',
        collection_id: 'col_mock',
        variants: [
          {
            id: 'var_mock',
            title: 'Default',
            product_id: 'prod_mock',
            sku: 'ETH-001',
            prices: [
              {
                id: 'price_mock',
                currency_code: 'USD',
                amount: 1500,
                region_id: 'reg_mock'
              }
            ]
          }
        ]
      }
    ]
  });
});

// Default 404 handler
app.use('*', (req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Not found' });
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Mock Medusa server running on http://localhost:${PORT}`);
});
