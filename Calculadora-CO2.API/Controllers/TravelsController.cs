using Calculadora_CO2.API.DTO;
using Calculadora_CO2.API.Models;
using Calculadora_CO2.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Calculadora_CO2.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TravelsController : ControllerBase
    {

        private readonly TravelService _travelService;

        public TravelsController(TravelService travelService)
        {
            _travelService = travelService;
        }

        [HttpPost]
        public async Task<ActionResult<Travel>> CreateTravel([FromBody] TravelDTO travelDto)
        {
            if (travelDto == null) return BadRequest("Os dados da viagem são obrigatórios.");

            try
            {
                var createdTravel = await _travelService.CreateTravelAsync(travelDto);
                return Ok(createdTravel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao criar viagem: {ex.Message}");
            }
        }
    }
}
