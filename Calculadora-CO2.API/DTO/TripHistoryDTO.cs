namespace Calculadora_CO2.API.DTO;

public class TripHistoryDTO
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public double Distance { get; set; }
    public string? TransportType { get; set; }
    public string? TransportSize { get; set; }
    public string? TransportLabel { get; set; }
    public string? Fuel { get; set; }
    public double Emission { get; set; }
}