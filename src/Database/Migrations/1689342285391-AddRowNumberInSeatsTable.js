"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRowNumberInSeatsTable1689342285391 = void 0;
class AddRowNumberInSeatsTable1689342285391 {
    constructor() {
        this.name = 'AddRowNumberInSeatsTable1689342285391';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Seats" ADD "rowNumber" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Seats" DROP COLUMN "rowNumber"`);
    }
}
exports.AddRowNumberInSeatsTable1689342285391 = AddRowNumberInSeatsTable1689342285391;
//# sourceMappingURL=1689342285391-AddRowNumberInSeatsTable.js.map