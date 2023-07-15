"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const fs = tslib_1.__importStar(require("fs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // logging: true,
    // maxQueryExecutionTime: 1000,
    // logger: "file",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync((0, path_1.join)(__dirname, "/../../root.crt")).toString(),
    },
    entities: [(0, path_1.join)(__dirname, "./Entities/*{.ts,.js}")],
    migrations: [(0, path_1.join)(__dirname, "./Migrations/*{.ts,.js}")],
    synchronize: false,
});
exports.default = appDataSource;
//# sourceMappingURL=DataSource.js.map