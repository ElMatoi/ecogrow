import {
    Body,
    Controller,
    Delete,
    Post,
    Put,
    Request,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, JWTRequest } from '../../guards/auth.guard';
import { AccessTokenResponse } from '../../types/auth';
import { LogsInterceptor } from 'src/interceptors/logs.interceptors';
import { ResponseMessage } from '../../types/response';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
 
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    @UseInterceptors(LogsInterceptor())
    register(
      @Body() registerDto: RegisterDto,
    ): Promise<ResponseMessage<AccessTokenResponse>> {
      return this.authService.register(registerDto);
    }
  
    @Post('login')
    @UseInterceptors(LogsInterceptor())
    login(
      @Body() loginDto: LoginDto,
    ): Promise<ResponseMessage<AccessTokenResponse>> {
      return this.authService.login(loginDto);
    }
  
    
    
  }