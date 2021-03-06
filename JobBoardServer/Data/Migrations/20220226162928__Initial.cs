using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobBoardServer.Data.Migrations
{
    public partial class _Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobList", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    EmailAddress = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserList", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "JobList",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 1, "Description of job 1", "Job1" });

            migrationBuilder.InsertData(
                table: "JobList",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 2, "Description of job 2", "Job2" });

            migrationBuilder.InsertData(
                table: "JobList",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 3, "Description of job 3", "Job3" });

            migrationBuilder.InsertData(
                table: "JobList",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 4, "Description of job 4", "Job4" });

            migrationBuilder.InsertData(
                table: "JobList",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 5, "Description of job 5", "Job5" });

            migrationBuilder.InsertData(
                table: "UserList",
                columns: new[] { "Id", "EmailAddress", "FirstName", "LastName", "Password", "Role" },
                values: new object[] { 1, "karo.admin@email.com", "Karo", "Lina", "haslo123", "admin" });

            migrationBuilder.InsertData(
                table: "UserList",
                columns: new[] { "Id", "EmailAddress", "FirstName", "LastName", "Password", "Role" },
                values: new object[] { 2, "via.admin@email.com", "Via", "Oli", "haslo321", "user" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobList");

            migrationBuilder.DropTable(
                name: "UserList");
        }
    }
}
