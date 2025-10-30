using Calculadora_CO2.API.Data;
using Calculadora_CO2.API.DTO;
using Calculadora_CO2.API.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Hosting;
using System;

namespace Calculadora_CO2.API.Services
{
    public class TravelService
    {
        private readonly AppDbContext _context;

        public TravelService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TravelResultDTO> CreateTravelAsync(TravelDTO travelDto)
        {
            double emissionKg = CalculateEmission(travelDto);
            string transportLabel = GetTransportLabel(travelDto);

            var newTravel = new Travel
            {
                DistanceKm = travelDto.DistanceKm,
                EmissionKg = emissionKg,
                TransportType = travelDto.TransportType!,
                TransportSize = transportLabel,
                FuelType = travelDto.FuelType,
            };

            _context.Travels.Add(newTravel);
            await _context.SaveChangesAsync();

            var resultDto = new TravelResultDTO
            {
                DistanceKm = travelDto.DistanceKm,
                TransportType = travelDto.TransportType,
                TransportSize = travelDto.TransportSize,
                TransportLabel = transportLabel,
                FuelType = travelDto.FuelType,
                Emited = emissionKg,
            };

            return resultDto;
        }

        private double CalculateEmission(TravelDTO travelDTO)
        {
            double fatorEmissaoGramsKm = 0;

            var transportType = travelDTO?.TransportType?.ToLower();

            switch (transportType)
            {
                case "carro":
                    switch (travelDTO?.TransportSize?.ToLower())
                    {
                        case "leve":
                            if(travelDTO.FuelType == "gasolina") fatorEmissaoGramsKm = 280;
                            if(travelDTO.FuelType == "alcool") fatorEmissaoGramsKm = 80;
                            if(travelDTO.FuelType == "hibrido") fatorEmissaoGramsKm = 27;
                            if (travelDTO.FuelType == "eletrico") fatorEmissaoGramsKm = 6;
                            break;
                        case "medio":
                            if (travelDTO.FuelType == "gasolina") fatorEmissaoGramsKm = 311;
                            if (travelDTO.FuelType == "alcool") fatorEmissaoGramsKm = 89;
                            if (travelDTO.FuelType == "hibrido") fatorEmissaoGramsKm = 29;
                            if (travelDTO.FuelType == "eletrico") fatorEmissaoGramsKm = 7;
                            break;
                        case "pesado":
                            if (travelDTO.FuelType == "gasolina") fatorEmissaoGramsKm = 373;
                            if (travelDTO.FuelType == "alcool") fatorEmissaoGramsKm = 106;
                            if (travelDTO.FuelType == "hibrido") fatorEmissaoGramsKm = 33;
                            if (travelDTO.FuelType == "eletrico") fatorEmissaoGramsKm = 8;
                            break;
                        default:
                            fatorEmissaoGramsKm = 123;
                            break;
                    }
                    break;

                case "moto":
                    switch (travelDTO?.TransportSize?.ToLower())
                    {
                        case "pequena":
                            fatorEmissaoGramsKm = 58;
                            break;
                        case "media":
                            fatorEmissaoGramsKm = 82;
                            break;
                        case "grande":
                            fatorEmissaoGramsKm = 115;
                            break;
                        default:
                            fatorEmissaoGramsKm = 82;
                            break;
                    }
                    break;
                case "onibus":
                    fatorEmissaoGramsKm = 32; 
                    break;
                case "aviao":
                    fatorEmissaoGramsKm = 123;
                    break;
                case "bicicleta-eletrica":
                    fatorEmissaoGramsKm = 20;
                    break;
                case "bicicleta":
                case "ape":
                    fatorEmissaoGramsKm = 0;
                    break;
                default:
                    fatorEmissaoGramsKm = 100; 
                    break;
            }

            double emissaoKg = (travelDTO!.DistanceKm * fatorEmissaoGramsKm) / 1000.0;
            return emissaoKg;
        }

        private string GetTransportLabel(TravelDTO travelDTO)
        {
            if (travelDTO.TransportType == "carro") return $"Carro {travelDTO.FuelType} - ({travelDTO.TransportSize})";
            if (travelDTO.TransportType == "moto") return $"Moto {travelDTO.TransportSize}";
            if (travelDTO.TransportType == "onibus") return "Ônibus";
            if (travelDTO.TransportType == "aviao") return "Avião";
            if (travelDTO.TransportType == "bicicleta") return "Bicicleta";
            if (travelDTO.TransportType == "ape") return "A pé";

            return "Outro";
        }
    }

}

