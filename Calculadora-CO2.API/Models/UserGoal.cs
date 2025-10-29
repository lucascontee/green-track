using System.ComponentModel.DataAnnotations;

namespace Calculadora_CO2.API.Models
{
    public class UserGoal
    {
        public int Id { get; set; }

        public double MonthlyEmissionGoalKg { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
