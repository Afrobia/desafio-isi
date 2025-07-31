import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
  
          const IS_PRODUCTION = configService.get('NODE_ENV') === 'production';
  
          const config = {
            type: 'postgres',
            port: 5012,
            url: configService.get('DATABASE_URL'),
            entities: [__dirname + '/../**/*.entity.{ts|js}'],
            autoLoadEntities: true, 
            migrations: [__dirname + '/migrations/*.ts'],
            synchronize: IS_PRODUCTION ? false : true,
            logger: IS_PRODUCTION ? 'error' : 'debug',
          }; 
          return config as TypeOrmModuleAsyncOptions;
        
      }
      }),
  ]
})

export class DbModule {
  constructor(private dataSource: DataSource) {}
}
