using System.ComponentModel.DataAnnotations;

namespace Calculadora_CO2.API.Models;

public class Travel
{
    public int Id { get; set; } 

    public DateTime CreatedAt { get; set; }

    public double DistanceKm { get; set; }

    public double EmissionKg { get; set; }

    public string TransportType { get; set; } = String.Empty;

    public string TransportLabel { get; set; } = String.Empty;

    public string? FuelType { get; set; }

    public string? CarType { get; set; }

}
