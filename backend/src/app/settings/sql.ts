import {createConnection} from 'typeorm'
import {default as Users} from '../models/sql/Users'
import {default as exampleData} from '../models/sql/exampleData'
import config from '../settings/config';

export const sql =  createConnection({
    "type": config.services.sqldb.type,
    "host": config.services.sqldb.host,
    "port": config.services.sqldb.port,
    "username": config.services.sqldb.username,
    "password": config.services.sqldb.password,
    "database": config.services.sqldb.database,
    "entities": [Users, exampleData],
    // "entities": ['src/app/models/sql/{.ts,.js}'],    
    "migrationsTableName": "custom_migration_table",
    "migrations": ["migration/*.ts"],
    "cli": {
        "migrationsDir": "migration"
    },
    "synchronize": true
});

