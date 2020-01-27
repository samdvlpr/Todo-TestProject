using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Endpoints.Todo.Migrations
{
    public partial class ExtraTodoFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CompleteBy",
                table: "Todo",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Todo",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Todo",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompleteBy",
                table: "Todo");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Todo");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Todo");
        }
    }
}
