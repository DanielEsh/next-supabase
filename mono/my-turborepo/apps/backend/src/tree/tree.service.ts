import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { TreeEntity } from './tree.entity';

export class TreeDto {
  id: number;
  name: string;
  parentId: number | null;
}

@Injectable()
export class TreeService {
  constructor(
    @InjectRepository(TreeEntity)
    private readonly treeRepository: TreeRepository<TreeEntity>,
  ) {}

  async getTree(): Promise<any> {
    const tree = await this.treeRepository
      .createQueryBuilder('tree')
      .where('tree.parentId IS NULL')
      .getMany();

    console.log('TREE', tree);

    return tree;
  }

  private toTreeDto(categories: TreeEntity[]): TreeDto[] {
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      parentId: category.parent ? category.parent.id : null,
    }));
  }

  async getChildren(id: number): Promise<TreeDto[]> {
    const parent = await this.treeRepository.findOne({
      where: {
        id,
      },
      relations: ['children'],
    });
    const descendants = await this.treeRepository.findDescendants(parent);

    console.log('P', parent);
    console.log('descendants', descendants);

    return descendants;
  }
}
