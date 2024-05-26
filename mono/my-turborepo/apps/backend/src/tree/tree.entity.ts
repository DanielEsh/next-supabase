import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  JoinColumn,
} from 'typeorm';

@Entity('Tree')
@Tree('closure-table')
export class TreeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('integer', { nullable: true })
  parentId: number;

  @TreeChildren()
  children: TreeEntity[];

  @TreeParent()
  @JoinColumn({ name: 'parentId' })
  parent: TreeEntity;
}
