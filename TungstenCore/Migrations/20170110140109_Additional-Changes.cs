using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TungstenCore.Migrations
{
    public partial class AdditionalChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserCourse_AspNetUsers_CourseId",
                table: "ApplicationUserCourse");

            migrationBuilder.DropIndex(
                name: "IX_ApplicationUserCourse_CourseId",
                table: "ApplicationUserCourse");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserCourse_AspNetUsers_ApplicationUserId",
                table: "ApplicationUserCourse",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUserCourse_AspNetUsers_ApplicationUserId",
                table: "ApplicationUserCourse");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserCourse_CourseId",
                table: "ApplicationUserCourse",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUserCourse_AspNetUsers_CourseId",
                table: "ApplicationUserCourse",
                column: "CourseId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
