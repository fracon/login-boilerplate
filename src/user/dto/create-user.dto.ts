import { Role } from "src/shared/entities/role-entity";

export class CreateUserDto {

  firstName: string;
  lastName: string;
  password:string;
  email:string;
  role: Role;
  createdBy: string;
  updatedBy: string;

}
