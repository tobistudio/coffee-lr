#!/bin/bash

echo "==================================="
echo "  SHOPIFY → MEDUSA SYNC CHECK"
echo "==================================="
echo ""

# Run the Python verification script
python3 verify_migration.py

echo ""
echo "To see detailed product lists, run:"
echo "  • python3 check_shopify_products.py    # For Shopify products"
echo "  • curl http://localhost:9000/store/products | python3 -m json.tool    # For Medusa products"
echo ""
echo "Report saved to: MIGRATION_REPORT.md"
