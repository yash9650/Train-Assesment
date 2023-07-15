import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTrainIdInSeatsTable1689344454219 implements MigrationInterface {
    name = 'AddedTrainIdInSeatsTable1689344454219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Seats" DROP CONSTRAINT "FK_89575fa086f2f528b8cba89a296"`);
        await queryRunner.query(`ALTER TABLE "Seats" ALTER COLUMN "rowNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Seats" ALTER COLUMN "trainId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Seats" ALTER COLUMN "trainId" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "Seats" ADD CONSTRAINT "FK_89575fa086f2f528b8cba89a296" FOREIGN KEY ("trainId") REFERENCES "Trains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Seats" DROP CONSTRAINT "FK_89575fa086f2f528b8cba89a296"`);
        await queryRunner.query(`ALTER TABLE "Seats" ALTER COLUMN "trainId" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Seats" ALTER COLUMN "trainId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Seats" ALTER COLUMN "rowNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Seats" ADD CONSTRAINT "FK_89575fa086f2f528b8cba89a296" FOREIGN KEY ("trainId") REFERENCES "Trains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
