import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';

export const GET = (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  res.status(200).json({
    status: 'healthy',
    message: 'Lavender Hill Springs Medusa Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
};
