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

        [HttpGet("history")]
        public async Task<ActionResult<List<TripHistoryDTO>>> GetTravelHistory()
        {
            try
            {
                var travelHistory = await _travelService.GetTravelHistoryAsync();
                return Ok(travelHistory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao obter histórico de viagens: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteById (int id)
        {
            try
            {
                bool deleted = await _travelService.DeleteTravelByIdAsync(id);
                if (deleted)
                {
                    return Ok($"Viagem com ID {id} deletada com sucesso.");
                }
                else
                {
                    return NotFound($"Viagem com ID {id} não encontrada.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao deletar viagem: {ex.Message}");
            }
        }
    }
}
