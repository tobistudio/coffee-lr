import { Container } from "@medusajs/medusa"

export default async function updatePrices(container: Container) {
  try {
    // Get services from container
    const productService = container.resolve("productService")
    const moneyAmountService = container.resolve("moneyAmountService")
    const regionService = container.resolve("regionService")

    // Get all regions
    const regions = await regionService.list({})
    console.log(`Found ${regions.length} regions`)
    
    // Define reasonable coffee prices (in cents)
    const priceMap: Record<string, { usd: number; cad: number }> = {
      // Premium Single Origins
      "Colombian Coffee": { usd: 1899, cad: 2499 }, // $18.99 USD / $24.99 CAD
      "Ethiopian Coffee": { usd: 1899, cad: 2499 },
      "Ethiopian Yirgacheffe Natural Process": { usd: 2199, cad: 2799 }, // $21.99 USD / $27.99 CAD
      "Mexican Coffee": { usd: 1799, cad: 2399 }, // $17.99 USD / $23.99 CAD
      "Guatemalan Coffee": { usd: 1799, cad: 2399 },
      "Guatemalan Antigua Fully Washed": { usd: 1999, cad: 2599 }, // $19.99 USD / $25.99 CAD
      "Colombian Huila Single Origin": { usd: 1999, cad: 2599 },
      "Kaiyin Coffee": { usd: 1899, cad: 2499 },
      
      // Specialty Blends
      "Chili Choco Spice - Dark Roast": { usd: 1699, cad: 2299 }, // $16.99 USD / $22.99 CAD
      "Midnight Dark - Dark Roast": { usd: 1699, cad: 2299 },
      "Twilight Peak - Dark Roast": { usd: 1699, cad: 2299 },
      "Sunrise Single-Origin - Light Roast": { usd: 1799, cad: 2399 },
      "Cardamom Spiced Roast - Dark Roast": { usd: 1799, cad: 2399 },
      "Coconut Mocha Delight - Medium Roast": { usd: 1799, cad: 2399 },
      "Lavender Hill Springs Decaf - Medium Roast": { usd: 1699, cad: 2299 },
      "Lavender Hill Springs Blend - Medium Roast": { usd: 1699, cad: 2299 },
      
      // Specialty Flavored Coffees
      "Gingerbread Coffee": { usd: 1899, cad: 2499 },
      "Birthday Cake Coffee": { usd: 1899, cad: 2499 },
      "The Raven Coffee": { usd: 1899, cad: 2499 },
      
      // Herbal/Specialty
      "Yogi Blend - High Vibes Herbal Coffee": { usd: 1999, cad: 2599 }, // $19.99 USD / $25.99 CAD
    }

    console.log("Starting price update for all products...")

    // Get all products with variants
    const products = await productService.list({}, { relations: ["variants"] })
    console.log(`Found ${products.length} products`)

    for (const product of products) {
      const prices = priceMap[product.title]
      
      if (!prices) {
        console.log(`No price mapping found for: ${product.title}`)
        continue
      }

      console.log(`Updating prices for: ${product.title}`)

      // Update each variant
      for (const variant of product.variants) {
        // Delete existing prices for this variant
        const existingPrices = await moneyAmountService.list({ variant_id: variant.id })
        for (const price of existingPrices) {
          await moneyAmountService.delete(price.id)
        }

        // Create new prices for each region
        for (const region of regions) {
          const currencyCode = region.currency_code.toLowerCase()
          const priceAmount = prices[currencyCode as keyof typeof prices]
          
          if (priceAmount) {
            await moneyAmountService.create({
              currency_code: region.currency_code,
              amount: priceAmount,
              variant_id: variant.id,
              region_id: region.id,
            })
          }
        }
      }
    }

    console.log("Price update completed successfully!")
    
  } catch (error) {
    console.error("Error updating prices:", error)
  }
}

