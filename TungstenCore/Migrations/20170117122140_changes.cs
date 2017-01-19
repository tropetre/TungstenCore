using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TungstenCore.Migrations
{
    public partial class changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilePaths_Assignments_AssignmentId",
                table: "FilePaths");

            migrationBuilder.AlterColumn<string>(
                name: "AssignmentId",
                table: "FilePaths",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_FilePaths_Assignments_AssignmentId",
                table: "FilePaths",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilePaths_Assignments_AssignmentId",
                table: "FilePaths");

            migrationBuilder.AlterColumn<string>(
                name: "AssignmentId",
                table: "FilePaths",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FilePaths_Assignments_AssignmentId",
                table: "FilePaths",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
