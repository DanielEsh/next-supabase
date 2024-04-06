import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createClient } from '@supabase/supabase-js';

@Controller()
export class AppController {
  supabase: any;

  constructor(private readonly appService: AppService) {
    this.supabase = createClient(
      'https://hbnabwxbfbtsmfogbyth.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibmFid3hiZmJ0c21mb2dieXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4OTYzOTAsImV4cCI6MjAyNzQ3MjM5MH0.9IrXgTbQ8fGlvFSjwuth2YjefhybRZFU3bTg5mDiMzk',
    );
  }

  @Get()
  async getHello() {
    const { data } = await this.supabase.from('group').select(`
                name,
                permission!group_permission(name)
  `);
    return data;
  }
}
