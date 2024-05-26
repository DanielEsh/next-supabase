import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SupabaseModule } from './supabase/supabase.module';
import { APP_GUARD } from '@nestjs/core';
import { SupabaseGuard } from './supabase/supabase.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from './file/file.module';
import { TreeModule } from './tree/tree.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    SupabaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-eu-central-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.hbnabwxbfbtsmfogbyth',
      password: '2FAtMOcxtUgnSAMQ',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FileModule,
    TreeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: SupabaseGuard,
    // },
  ],
})
export class AppModule {}
