import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';
import appConfig from './config copy/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { RegionModule } from './modules/region/region.module';
import { ParameterModule } from './modules/parameter/parameter.module';
import { FilesModule } from './modules/files/files.module';
import { MainJemaatModule } from './modules/jemaat/jemaat.module';
import { MainCermonModule } from './modules/cermon/ibadah.module';
import { MainBlesscomnModule } from './modules/blesscomn/blesscomn.module';
import { MainDiscipleshipModule } from './modules/discipleship/discipleship.module';
import { ExampleModule } from './modules/example/example.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    AdminModule,
    RegionModule,
    ParameterModule,
    FilesModule,
    MainJemaatModule,
    MainCermonModule,
    MainBlesscomnModule,
    MainDiscipleshipModule,
    ExampleModule,
    // other module...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
