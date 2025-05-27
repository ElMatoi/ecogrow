import { Controller, Get, Post, Body,Request } from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { LinkedMachineDto } from './dto/update-machine.dto';
import { JwtAuthGuard, JWTRequest } from "src/guards/auth.guard";
import { UseGuards } from '@nestjs/common';
import { ResponseMessage } from 'src/types/response';
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

@Post()
create(@Body() createMachineDto: CreateMachineDto) {
  const { code } = createMachineDto;
  return this.machineService.createMachine({code} );
}


  

}
