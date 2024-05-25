import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';
import { FileEntity } from './file.entity';

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // @Post()
  // async createNode(@Body() createTreeNodeDto: CreateTreeNodeDto): Promise<TreeNode> {
  //     return this.treeNodeService.createNode(createTreeNodeDto);
  // }

  // @Get()
  // async getTree(): Promise<FileEntity[]> {
  //   return this.fileService.getTree();
  // }

  @Get()
  async getTopLevelNodes(): Promise<FileEntity[]> {
    return this.fileService.getTopLevelNodes();
  }

  @Get(':id/children')
  async getChildren(@Param('id') id: number): Promise<FileEntity[]> {
    return this.fileService.getChildren(id);
  }

  @Get(':id')
  async getNode(@Param('id') id: number): Promise<FileEntity> {
    return this.fileService.getNode(id);
  }
}
