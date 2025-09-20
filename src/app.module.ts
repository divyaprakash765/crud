import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedModule } from './feed/feed.module';
import { DbConnections } from './db/db.source';
import { DbModule } from './db/db.module';
import { config } from 'process';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';


@Module({
  imports: [DbModule, ConfigModule.forRoot({ isGlobal : true}), UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
