import { DataSource } from 'typeorm';
import { config } from 'dotenv';


config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5012,
  url: process.env.DATABASE_URL,
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