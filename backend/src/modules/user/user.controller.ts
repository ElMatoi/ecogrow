import {
    Controller,
    Get,
    UseGuards,
    Request,
    UseInterceptors,
    Put,
    Body,
    Param,
    Post
  } from '@nestjs/common';
import { UserService } from './user.service';
import { LogsInterceptor } from 'src/interceptors/logs.interceptors';
import { ResponseMessage } from "src/types/response";
import { LinkedMachineDto } from './dto/linked.dto';
import { JwtAuthGuard, JWTRequest } from "src/guards/auth.guard";
  
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get("userinfo/:id")
  @UseInterceptors(LogsInterceptor())
  userinfo(@Param("id")id:string): Promise<ResponseMessage<any>>{
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("Linked-machine-user")
  @UseInterceptors(LogsInterceptor())
  linked(
    @Body() dto: LinkedMachineDto,
    @Request() req: any,
  ): Promise<ResponseMessage<any>> {
    
    const userid = (req as JWTRequest).user.id
    const machineid= dto.machineid
    
    return this.userService.linkMachineUser({userid, machineid});
  }
  
    
  }