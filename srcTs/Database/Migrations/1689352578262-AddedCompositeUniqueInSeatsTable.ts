import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCompositeUniqueInSeatsTable1689352578262 implements MigrationInterface {
    name = 'AddedCompositeUniqueInSeatsTable1689352578262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Seats" ADD CONSTRAINT "UQ_1a95392b16b8b5b22d301b5b5e8" UNIQUE ("seatNumber", "trainId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Seats" DROP CONSTRAINT "UQ_1a95392b16b8b5b22d301b5b5e8"`);
    }

}
