import { Entity, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @Column()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
