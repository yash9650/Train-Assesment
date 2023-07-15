"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedCompositeUniqueInSeatsTable1689352578262 = void 0;
class AddedCompositeUniqueInSeatsTable1689352578262 {
    constructor() {
        this.name = 'AddedCompositeUniqueInSeatsTable1689352578262';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Seats" ADD CONSTRAINT "UQ_1a95392b16b8b5b22d301b5b5e8" UNIQUE ("seatNumber", "trainId")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Seats" DROP CONSTRAINT "UQ_1a95392b16b8b5b22d301b5b5e8"`);
    }
}
exports.AddedCompositeUniqueInSeatsTable1689352578262 = AddedCompositeUniqueInSeatsTable1689352578262;
//# sourceMappingURL=1689352578262-AddedCompositeUniqueInSeatsTable.js.map