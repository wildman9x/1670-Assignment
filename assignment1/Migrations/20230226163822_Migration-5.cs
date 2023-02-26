using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace assignment1.Migrations
{
    public partial class Migration5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItem_Order_OrderId",
                table: "CartItem");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "CartItem",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CartItem_Order_OrderId",
                table: "CartItem",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItem_Order_OrderId",
                table: "CartItem");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "CartItem",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItem_Order_OrderId",
                table: "CartItem",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id");
        }
    }
}
