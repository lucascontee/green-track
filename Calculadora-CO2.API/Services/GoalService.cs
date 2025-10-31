using Calculadora_CO2.API.Data;
using Calculadora_CO2.API.DTO;
using Calculadora_CO2.API.Models;
using System.Data.Entity;

namespace Calculadora_CO2.API.Services
{
    public class GoalService
    {

        private readonly AppDbContext _context;

        public GoalService(AppDbContext context)
        {
            _context = context;
        }

        public Task<Goal?> GetGoalAsync()
        {
            var goal = _context.UserGoals.FirstOrDefault();
            return Task.FromResult(goal);
        }

        public Task<Goal> SetGoalAsync(GoalDTO goalDto)
        {
            var existingGoal = _context.UserGoals.FirstOrDefault();

            if (existingGoal != null)
            {
                existingGoal.MonthlyEmissionGoalKg = goalDto.MonthlyEmissionGoalKg;
                existingGoal.UpdatedAt = DateTime.UtcNow;
            }
            else
            {
                existingGoal = new Goal
                {
                    MonthlyEmissionGoalKg = goalDto.MonthlyEmissionGoalKg,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.UserGoals.Add(existingGoal);
            }

            _context.SaveChanges();

            return Task.FromResult(existingGoal);
        }
    }
}
