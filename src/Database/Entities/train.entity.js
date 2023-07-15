"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const seats_entity_1 = require("./seats.entity");
let TrainEntity = class TrainEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TrainEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar", length: 255 }),
    tslib_1.__metadata("design:type", String)
], TrainEntity.prototype, "trainName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    tslib_1.__metadata("design:type", Number)
], TrainEntity.prototype, "seatsAvailableCount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    tslib_1.__metadata("design:type", Number)
], TrainEntity.prototype, "seatsBookedCount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    tslib_1.__metadata("design:type", Number)
], TrainEntity.prototype, "waitingCount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar", length: 255 }),
    tslib_1.__metadata("design:type", String)
], TrainEntity.prototype, "fromStation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar", length: 255 }),
    tslib_1.__metadata("design:type", String)
], TrainEntity.prototype, "toStation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "timestamp" }),
    tslib_1.__metadata("design:type", Date)
], TrainEntity.prototype, "departureTime", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "timestamp" }),
    tslib_1.__metadata("design:type", Date)
], TrainEntity.prototype, "arrivalTime", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => seats_entity_1.SeatsEntity, (seats) => seats.train, {
        onDelete: "CASCADE",
    }),
    tslib_1.__metadata("design:type", Array)
], TrainEntity.prototype, "seats", void 0);
TrainEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)("Trains")
], TrainEntity);
exports.TrainEntity = TrainEntity;
//# sourceMappingURL=train.entity.js.map