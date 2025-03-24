import {
    Controller,
    Get,
    UseGuards,
    Request,
    UseInterceptors,
    Put,
    Body,
    Param,
  } from '@nestjs/common';
import { UserService } from './user.service';
import { LogsInterceptor } from 'interceptors/logs.interceptors';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { ResponseMessage } from "src/types/response";
  
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get("userinfo/:id")
  @UseInterceptors(LogsInterceptor())
  userinfo(@Param("id")id:string): Promise<ResponseMessage<any>>{
    return this.userService.getUserById(id);
  }
  
    
  }