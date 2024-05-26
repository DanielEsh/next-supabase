import { Controller, Get, Param } from '@nestjs/common';
import { TreeDto, TreeService } from './tree.service';
import { TreeEntity } from './tree.entity';

@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Get()
  async getTree(): Promise<TreeDto[]> {
    return this.treeService.getTree();
  }

  @Get(':id/children')
  async getChildren(@Param('id') id: number): Promise<TreeDto[]> {
    return this.treeService.getChildren(id);
  }
}
