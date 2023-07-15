"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovedDefaultValueFromSeattable1689344547225 = void 0;
class RemovedDefaultValueFromSeattable1689344547225 {
    constructor() {
        this.name = "RemovedDefaultValueFromSeattable1689344547225";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Seats" ALTER COLUMN "trainId" DROP DEFAULT`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Seats" ALTER COLUMN "trainId" SET DEFAULT '1'`);
    }
}
exports.RemovedDefaultValueFromSeattable1689344547225 = RemovedDefaultValueFromSeattable1689344547225;
//# sourceMappingURL=1689344547225-RemovedDefaultValueFromSeattable.js.map