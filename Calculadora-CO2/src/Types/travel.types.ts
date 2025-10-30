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

export interface ITripHistory {
  id: string;
  date: string;
  distance: number;
  transportLabel: string; 
  transportSize: string;  
  transportType: string;  
  fuel: string;          
  emission: number;
}