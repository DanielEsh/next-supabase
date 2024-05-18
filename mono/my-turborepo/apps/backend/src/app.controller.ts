import { Controller, Get } from '@nestjs/common';
import { Supabase } from './supabase/supabase';

@Controller()
export class AppController {
  constructor(private readonly supabase: Supabase) {}

  @Get()
  async getHello() {
    //   const { data } = await this.supabase.getClient().from('group').select(`
    //               name,
    //               permissions:permission!group_permission(id, name)
    // `);

    // return data;

    return [
      {
        id: 1,
        name: 'Node 1',
      },
    ];
  }
}
