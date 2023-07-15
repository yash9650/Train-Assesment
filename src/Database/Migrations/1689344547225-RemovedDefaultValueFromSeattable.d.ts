import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemovedDefaultValueFromSeattable1689344547225 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
