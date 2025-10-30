export interface ITravelRequest {
  distanceKm: string;
  transportType: string;
  transportSize: string;
  transportLabel: string;
  fuelType: string;
}

export interface ITravelResult {
  distanceKm: string;
  transportType: string;
  transportSize: string;
  transportLabel: string;
  fuelType: string;
  emited: number;
}