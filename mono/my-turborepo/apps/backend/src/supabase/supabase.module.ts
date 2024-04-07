import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SupabaseGuard } from './supabase.guard';
import { Supabase } from './supabase';

@Module({
  imports: [ConfigModule],
  providers: [Supabase, SupabaseGuard],
  exports: [Supabase, SupabaseGuard],
})
export class SupabaseModule {}
