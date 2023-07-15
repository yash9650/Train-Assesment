import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTrainAndSeatsTableInDB1689303002408 implements MigrationInterface {
    name = 'AddTrainAndSeatsTableInDB1689303002408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Trains" ("id" SERIAL NOT NULL, "trainName" character varying(255) NOT NULL, "seatsAvailableCount" integer NOT NULL, "seatsBookedCount" integer NOT NULL, "waitingCount" integer NOT NULL, "fromStation" character varying(255) NOT NULL, "toStation" character varying(255) NOT NULL, "departureTime" TIMESTAMP NOT NULL, "arrivalTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_632772deb5d246a179ae5eb27a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Seats" ("id" SERIAL NOT NULL, "seatNumber" integer NOT NULL, "trainName" character varying(255) NOT NULL, "isAvailable" boolean NOT NULL, "isBooked" boolean NOT NULL, "trainId" integer, CONSTRAINT "PK_16f871ccd9cf24c4b2dc7f6826c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Seats" ADD CONSTRAINT "FK_89575fa086f2f528b8cba89a296" FOREIGN KEY ("trainId") REFERENCES "Trains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Seats" DROP CONSTRAINT "FK_89575fa086f2f528b8cba89a296"`);
        await queryRunner.query(`DROP TABLE "Seats"`);
        await queryRunner.query(`DROP TABLE "Trains"`);
    }

}
