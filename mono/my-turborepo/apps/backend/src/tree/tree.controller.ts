import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TreeDto, TreeService } from './tree.service';
import { TreeEntity } from './tree.entity';

@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post('')
  async createTreeNode(
    @Body('name') name: string,
    @Body('parentId') parentId?: number,
  ): Promise<TreeEntity> {
    if (!name) {
      throw new BadRequestException('Name is required');
    }

    return this.treeService.createTreeNode(name, parentId);
  }

  @Get()
  async getTree(): Promise<TreeDto[]> {
    return this.treeService.getTree();
  }

  @Get(':id/children')
  async getChildren(@Param('id') id: number): Promise<TreeDto[]> {
    return this.treeService.getChildren(id);
  }

  @Put(':id')
  updateNode(
    @Param('id') id: number,
    @Body('name') name: string,
  ): Promise<TreeDto> {
    return this.treeService.updateNode(id, name);
  }

  @Delete(':id')
  deleteNode(@Param('id') id: number): Promise<void> {
    return this.treeService.deleteNode(id);
  }
}
