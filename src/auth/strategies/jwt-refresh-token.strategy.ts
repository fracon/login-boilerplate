import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refreshtoken") {
  constructor(private userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback:true
    });
  }
 
  async validate(req:any, payload:any) {
    
    var user = await this.userService.findByEmail(payload.email);

    if(!user){
        throw new UnauthorizedException();
    }
    if(req.body.refreshToken != user.refreshToken){
        throw new UnauthorizedException();
    }
    if( new Date() > new Date(user.refreshTokenExpireDate)){
      throw new UnauthorizedException();
    }
    return { sub: payload.sub, email: payload.email, role: payload.role };
  }
}