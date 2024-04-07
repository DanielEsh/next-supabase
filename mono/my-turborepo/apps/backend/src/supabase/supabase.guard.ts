import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Supabase } from './supabase';
import { createClient } from '@supabase/supabase-js';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      console.log('token', token);
      const client = createClient(
        this.configService.get('SUPABASE_URL'),
        this.configService.get('SUPABASE_KEY'),
        {
          auth: {
            autoRefreshToken: true,
            detectSessionInUrl: false,
          },
        },
      );

      const user = await client.auth.getUser(token);
      console.log('user', user);
      if (!user.data.user) {
        throw new UnauthorizedException('Unauthorized');
      }
      return true;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
