namespace Calculadora_CO2.API.DTO;

public class TravelDTO
{   
    public double DistanceKm { get; set; }
    public string? TransportType { get; set; } 
    public string? TransportSize { get; set; }
    public string? TransportLabel { get; set; }
    public string? FuelType { get; set; }
}
