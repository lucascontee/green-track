using Calculadora_CO2.API.DTO;
using Calculadora_CO2.API.Models;
using Calculadora_CO2.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Calculadora_CO2.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GoalsController : ControllerBase
    {

        private readonly GoalService _goalService;

        public GoalsController(GoalService goalService)
        {
            _goalService = goalService;
        }

        [HttpPost]
        public async Task<ActionResult<Goal>> CreateGoall([FromBody] GoalDTO goalDto)
        {
            if (goalDto == null) return BadRequest("Os dados da meta são obrigatórios.");

            try
            {
                var createdGoal = await _goalService.SetGoalAsync(goalDto);
                return Ok(createdGoal);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao criar meta: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<Goal>> GetGoal()
        {
            try
            {
                var goal = await _goalService.GetGoalAsync();
                return Ok(goal);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao obter meta: {ex.Message}");
            }
        }

    }
}
