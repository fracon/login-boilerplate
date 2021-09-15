import { Entity, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base-entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/shared/entities/role-entity';

@Entity()
export class User extends BaseEntity {

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false
  })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER})
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    nullable: true
  })
  refreshToken:string;

  @Column({
    nullable: true
  })
  refreshTokenExpireDate:string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const saltOrRounds = 10;
      this.password = await bcrypt.hash(this.password, saltOrRounds);
    }
  }

}
