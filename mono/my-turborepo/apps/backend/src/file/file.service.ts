import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileEntityRepository: Repository<FileEntity>,
  ) {}

  // async createNode(createTreeNodeDto: CreateTreeNodeDto): Promise<TreeNode> {
  //     const { id, name, leaf, parentId } = createTreeNodeDto;
  //     const parent = parentId ? await this.treeNodeRepository.findOne(parentId) : null;
  //     const node = this.treeNodeRepository.create({ id, name, leaf, parent });
  //     return this.treeNodeRepository.save(node);
  // }

  async getTree(): Promise<FileEntity[]> {
    return this.fileEntityRepository.find({ relations: ['children'] });
  }

  async getTopLevelNodes(): Promise<FileEntity[]> {
    const res = await this.fileEntityRepository
      .createQueryBuilder('file')
      .select(['file.id', 'file.name', 'file.parentId'])
      // .leftJoin('file.parent', 'parent')
      // .where('file.parent IS NULL')
      .getMany();

    return res;
  }

  async getChildren(id: number): Promise<FileEntity[]> {
    const parentNode = await this.fileEntityRepository.findOne({
      where: {
        id,
      },
      relations: ['children'],
    });
    return parentNode ? parentNode.children : [];
  }

  async getNode(id: number): Promise<FileEntity> {
    return this.fileEntityRepository.findOne({
      where: {
        id,
      },
      relations: ['children'],
    });
  }
}
