import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  
  async create(createUserDto: CreateUserDto) : Promise<any> {
    const user = this.userRepository.create(createUserDto);
    const { password, ...result } = await this.userRepository.save(user);
    return result;
  }

  async findAll() : Promise<any[]> {
    let users = await this.userRepository.find();
    let usersWithtoutPassword = users.map( (user) => {
      const { password, ...result } = user; 
      return result;
    })
    return usersWithtoutPassword;
  }

  async findOne(id: number) : Promise<any> {
    const { password, ...result } = await this.userRepository.findOne(id)
    return result;
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ 
      where: { email: email }
    },);
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<any> {
    
    const user = await this.userRepository.findOne(id);

    user.password = updateUserDto.password ?? updateUserDto.password;
    user.firstName = updateUserDto.firstName ?? updateUserDto.firstName;
    user.lastName = updateUserDto.lastName ?? updateUserDto.lastName;
    user.role = updateUserDto.role ?? updateUserDto.role;
    
    const { password, ...result } = await this.userRepository.save(user);
    return result;
  }

  remove(id: number) : Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  saveOrUpdateRefreshToken( id:number, refreshToken:string, refreshTokenExpireDate:any) : Promise<UpdateResult> {
    return this.userRepository.update(id,{refreshToken:refreshToken, refreshTokenExpireDate:refreshTokenExpireDate});
  }
  
}
