import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRowNumberInSeatsTable1689342285391 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
