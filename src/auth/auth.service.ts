import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as randtoken from 'rand-token';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if(user){
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id ? user.id : user.sub, 
      role: user.role
    };
    return {
      access_token: this.jwtService.sign(payload),
      refreshToken: await this.generateRefreshToken(user.id ? user.id : user.sub)
    };
  }

  async generateRefreshToken(userId:number):  Promise<string>{
    var refreshToken = randtoken.generate(16);
    var expirydate = new Date();
    expirydate.setDate(expirydate.getDate() + 6);
    await this.userService.saveOrUpdateRefreshToken(userId, refreshToken, expirydate);
    return refreshToken;
  }

}
