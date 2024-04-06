import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SupabaseModule } from './supabase/supabase.module';
import { APP_GUARD } from '@nestjs/core';
import { SupabaseGuard } from './supabase/supabase.guard';

@Module({
  imports: [ConfigModule.forRoot(), PassportModule, SupabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
  ],
})
export class AppModule {}
