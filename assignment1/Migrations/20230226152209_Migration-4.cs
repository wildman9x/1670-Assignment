using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace assignment1.Migrations
{
    public partial class Migration4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItem_Book_BookId",
                table: "CartItem");

            migrationBuilder.DropIndex(
                name: "IX_CartItem_BookId",
                table: "CartItem");

            migrationBuilder.AlterColumn<int>(
                name: "BookId",
                table: "CartItem",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "BookId",
                table: "CartItem",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_CartItem_BookId",
                table: "CartItem",
                column: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItem_Book_BookId",
                table: "CartItem",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id");
        }
    }
}
