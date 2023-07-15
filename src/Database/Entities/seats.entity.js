"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatsEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const train_entity_1 = require("./train.entity");
let SeatsEntity = class SeatsEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SeatsEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    tslib_1.__metadata("design:type", Number)
], SeatsEntity.prototype, "seatNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    tslib_1.__metadata("design:type", Number)
], SeatsEntity.prototype, "rowNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: "int",
    }),
    tslib_1.__metadata("design:type", Number)
], SeatsEntity.prototype, "trainId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar", length: 255 }),
    tslib_1.__metadata("design:type", String)
], SeatsEntity.prototype, "trainName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    tslib_1.__metadata("design:type", Boolean)
], SeatsEntity.prototype, "isAvailable", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    tslib_1.__metadata("design:type", Boolean)
], SeatsEntity.prototype, "isBooked", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => train_entity_1.TrainEntity, (train) => train.seats),
    (0, typeorm_1.JoinColumn)({ name: "trainId" }),
    tslib_1.__metadata("design:type", train_entity_1.TrainEntity)
], SeatsEntity.prototype, "train", void 0);
SeatsEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)("Seats"),
    (0, typeorm_1.Unique)(["seatNumber", "trainId"])
], SeatsEntity);
exports.SeatsEntity = SeatsEntity;
//# sourceMappingURL=seats.entity.js.map