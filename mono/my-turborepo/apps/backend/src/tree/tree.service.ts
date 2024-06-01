import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { TreeEntity } from './tree.entity';

export class TreeDto extends TreeEntity {
  leaf: boolean;
}

@Injectable()
export class TreeService {
  constructor(
    @InjectRepository(TreeEntity)
    private readonly treeRepository: TreeRepository<TreeEntity>,
  ) {}

  async getTree(): Promise<any> {
    // const tree = await this.treeRepository
    //   .createQueryBuilder('tree')
    //   .where('tree.parentId IS NULL')
    //   .getMany();
    //
    // console.log('TREE', tree);
    //
    // return tree;

    // Get the tree nodes with their children count
    const tree = await this.treeRepository
      .createQueryBuilder('tree')
      .leftJoinAndSelect('tree.children', 'children')
      .loadRelationCountAndMap('tree.childrenCount', 'tree.children')
      .where('tree.parentId IS NULL')
      .getMany();

    // Map to TreeDto with leaf property
    const nodeChildrenCount = tree.reduce((acc, node) => {
      // @ts-ignore
      acc[node.id] = node.childrenCount;
      return acc;
    }, {});

    return this.toTreeDto(tree, nodeChildrenCount);
  }

  private toTreeDto(
    categories: TreeEntity[],
    nodeChildrenCount: Record<number, number>,
  ): TreeDto[] {
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      parentId: category.parentId,
      leaf:
        !nodeChildrenCount[category.id] || nodeChildrenCount[category.id] === 0,
    }));
  }

  async getChildren(id: number): Promise<any> {
    const parent = await this.treeRepository.findOne({
      where: {
        id,
      },
      relations: ['children'],
    });
    if (!parent) {
      throw new NotFoundException(`Node with id ${id} not found`);
    }
    //
    const descendants = await this.treeRepository.findDescendants(parent);

    // // Remove the parent node from the descendants
    const filteredDescendants = descendants.filter(
      (descendant) => descendant.id !== parent.id,
    );

    // Get children count for each descendant
    const descendantIds = filteredDescendants.map((desc) => desc.id);
    const childrenCounts = await this.treeRepository
      .createQueryBuilder('tree')
      .leftJoin('tree.children', 'children')
      .where('tree.id IN (:...descendantIds)', { descendantIds })
      .select('tree.id', 'id')
      .addSelect('COUNT(children.id)', 'childrenCount')
      .groupBy('tree.id')
      .getRawMany();

    const nodeChildrenCount = childrenCounts.reduce(
      (acc, { id, childrenCount }) => {
        acc[id] = parseInt(childrenCount, 10);
        return acc;
      },
      {},
    );

    return this.toTreeDto(filteredDescendants, nodeChildrenCount);
  }

  async createTreeNode(name: string, parentId?: number): Promise<TreeEntity> {
    const newNode = new TreeEntity();
    newNode.name = name;

    if (parentId) {
      const parent = await this.treeRepository.findOne({
        where: { id: parentId },
      });
      if (!parent) {
        throw new Error(`Parent node with id ${parentId} not found`);
      }

      newNode.parent = parent;
      newNode.parentId = parent.id;
    }

    return await this.treeRepository.save(newNode);
  }

  async updateNode(id: number, name: string): Promise<any> {
    const node = await this.treeRepository.findOne({
      where: {
        id,
      },
    });

    node.name = name;

    return this.treeRepository.save(node);
  }
}
