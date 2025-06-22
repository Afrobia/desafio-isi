import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
  
          const IS_PRODUCTION = configService.get('NODE_ENV') === 'production';
  
          const config = {
            type: 'postgres',
            port: 5432,
            host: configService.getOrThrow<string>('DB_HOST'),
            username: configService.getOrThrow<string>('DB_USER'),
            password: configService.getOrThrow<string>('DB_PASSWORD'),
            database: configService.getOrThrow<string>('DB_DATABASE'),
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

export class DbModule {}