import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedDefaultValueFromSeattable1689344547225
  implements MigrationInterface
{
  name = "RemovedDefaultValueFromSeattable1689344547225";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Seats" ALTER COLUMN "trainId" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Seats" ALTER COLUMN "trainId" SET DEFAULT '1'`
    );
  }
}
