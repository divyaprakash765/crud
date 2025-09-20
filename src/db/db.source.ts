import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";


export const DbConnections = [
  {
    provide : 'DataSource',
    useFactory: async (configService : ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [],
      logging: true
      })
      return await dataSource.initialize()
    },
    inject:[ConfigService]
  }
]