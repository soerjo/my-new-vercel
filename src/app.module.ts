import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
