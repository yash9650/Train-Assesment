import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddedTrainIdInSeatsTable1689344454219 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
