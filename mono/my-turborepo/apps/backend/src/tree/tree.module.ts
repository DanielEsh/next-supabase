import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreeEntity } from './tree.entity';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TreeEntity])],
  providers: [TreeService],
  controllers: [TreeController],
})
export class TreeModule {}
