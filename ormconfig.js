module.exports = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_POST),
    username: process.env.PG_NAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    entities: ['./dist/**/**.entity{.ts,.js}'],
    synchronize: false,
    seeds: ['./dist/**/*.seed{.ts,.js}'],
    factories: ['./dist/**/*.factory{.ts,.js}']
};