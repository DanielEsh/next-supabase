import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  leaf: boolean;

  @ManyToOne(() => FileEntity, (node) => node.children)
  @JoinColumn({ name: 'parentId' })
  parent: FileEntity;

  @OneToMany(() => FileEntity, (node) => node.parent)
  children: FileEntity[];
}
