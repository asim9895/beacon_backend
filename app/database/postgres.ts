import { Entities } from "../entities";
import { DataSource, DataSourceOptions } from "typeorm";

export let dataSource: DataSource;

export const connectDb = async () => {
  try {
    // Connecting postgres db in the application
    dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "asim7648",
      database: "Beacon",
      entities: Entities,
      synchronize: true,
    });

    await dataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.log("database connection error");
    console.log(error);
  }
};
