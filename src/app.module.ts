import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import dbconfig from './shared/config/dbconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbconfig()),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
