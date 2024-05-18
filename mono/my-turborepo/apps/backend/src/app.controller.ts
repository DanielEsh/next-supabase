import { Controller, Get, Param } from '@nestjs/common';
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
        leaf: false,
      },
      {
        id: 2,
        name: 'Node 2',
        leaf: false,
      },
      {
        id: 3,
        name: 'Node 3',
        leaf: false,
      },
      {
        id: 4,
        name: 'Node 4',
        leaf: true,
      },
    ];
  }

  @Get(':id/children')
  async getChildren(@Param('id') id: string) {
    //   const { data } = await this.supabase.getClient().from('group').select(`
    //               name,
    //               permissions:permission!group_permission(id, name)
    // `);

    // return data;

    if (+id === 1) {
      return [
        {
          id: 5,
          name: 'Node 1.1',
        },
        {
          id: 6,
          name: 'Node 1.2',
        },
        {
          id: 7,
          name: 'Node 1.3',
        },
        {
          id: 8,
          name: 'Node 1.4',
        },
      ];
    }

    if (+id === 2) {
      return [
        {
          id: 9,
          name: 'Node 2.1',
        },
        {
          id: 10,
          name: 'Node 2.2',
        },
        {
          id: 11,
          name: 'Node 2.3',
        },
        {
          id: 12,
          name: 'Node 2.4',
        },
      ];
    }

    if (+id === 3) {
      return [
        {
          id: 13,
          name: 'Node 3.1',
        },
      ];
    }

    return [];
  }
}
