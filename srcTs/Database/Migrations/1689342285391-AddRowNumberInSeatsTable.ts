import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRowNumberInSeatsTable1689342285391 implements MigrationInterface {
    name = 'AddRowNumberInSeatsTable1689342285391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Seats" ADD "rowNumber" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Seats" DROP COLUMN "rowNumber"`);
    }

}
