using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Calculadora_CO2.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTransportSizeeToTravel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarType",
                table: "Travels");

            migrationBuilder.AlterColumn<string>(
                name: "TransportLabel",
                table: "Travels",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "TransportSize",
                table: "Travels",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransportSize",
                table: "Travels");

            migrationBuilder.AlterColumn<string>(
                name: "TransportLabel",
                table: "Travels",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CarType",
                table: "Travels",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
