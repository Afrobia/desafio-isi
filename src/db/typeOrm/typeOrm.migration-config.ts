import { DataSource } from 'typeorm';
import { config } from 'dotenv';


config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/*.ts'],
  migrationsRun: true,
});

AppDataSource.initialize()
.then(() => {
  console.log("Data Source has been initialized!")
})
.catch((err) => {
  console.error("Error during Data Source initialization", err)
});