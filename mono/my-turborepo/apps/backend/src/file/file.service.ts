import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';

interface FileDto extends FileEntity {
  leaf: boolean;
}

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

  transformFilesNodes(nodes: FileEntity[]): FileDto[] {
    return nodes.map((node) => ({
      id: node.id,
      name: node.name,
      parentId: node.parentId,
      leaf: Boolean(!node.children?.length),
    }));
  }

  async getTopLevelNodes(): Promise<FileDto[]> {
    const topLevelNodes = await this.fileEntityRepository
      .createQueryBuilder('file')
      .leftJoinAndSelect('file.children', 'children') // Загружаем дочерние узлы
      .where('file.parent IS NULL')
      .getMany();

    return this.transformFilesNodes(topLevelNodes);
  }

  async getChildren(id: number): Promise<FileDto[]> {
    const parentNode = await this.fileEntityRepository
      .createQueryBuilder('file')
      .leftJoinAndSelect('file.children', 'children')
      .where('file.id = :id', { id })
      .getOne();

    if (parentNode) {
      console.log('RES', await this.loadChildrenRecursively(parentNode));
    }

    return parentNode ? this.transformFilesNodes(parentNode.children) : [];
  }

  async loadChildrenRecursively(node: FileEntity) {
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const childNode = await this.fileEntityRepository
          .createQueryBuilder('file')
          .leftJoinAndSelect('file.children', 'children')
          .where('file.id = :id', { id: child.id })
          .getOne();

        child.children = childNode ? childNode.children : [];
        if (child.children.length > 0) {
          await this.loadChildrenRecursively(child);
        }
      }
    }
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
