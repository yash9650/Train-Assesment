import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddedCompositeUniqueInSeatsTable1689352578262 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
