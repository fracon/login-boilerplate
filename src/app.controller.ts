import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtRefreshTokenGuard } from './shared/guards/jwt-refresh-token.guard';
import { LocalAuthGuard } from './shared/guards/local-auth.guard';

@Controller()
export class AppController {
  
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('auth/refreshtoken')
  async refreshToken(@Request() req){
    return await this.authService.login(req.user);
  }
  
}

