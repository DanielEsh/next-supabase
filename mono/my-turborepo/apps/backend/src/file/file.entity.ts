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

  @Column({ nullable: true }) // Разрешаем null для родительского ID, если это верхний уровень
  parentId: number; // Изменяем тип поля на число, чтобы хранить ID родительского элемента

  @ManyToOne(() => FileEntity, (node) => node.children)
  @JoinColumn({ name: 'parentId' })
  parent?: FileEntity;

  @OneToMany(() => FileEntity, (node) => node.parent)
  children?: FileEntity[];
}
