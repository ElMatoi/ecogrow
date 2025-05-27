import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SuccessHTTPAnswer,ThrowHTTPException } from "src/utils/http.service";
import { ResponseMessage } from "src/types/response";
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';

@Injectable ()
export class MachineService{
    constructor (
        @InjectRepository(Machine)
        private machineRepository: Repository<Machine>,

    ){}
  

async createMachine(data: {
    code : string
  }): Promise<ResponseMessage> {
    const newMachine = new Machine();
    newMachine.code= data.code;
    await this.machineRepository.save(newMachine)
    return SuccessHTTPAnswer("Machine registed in system", undefined);
  }

public async getIdMachineByCode(code: string): Promise<ResponseMessage<string>> {
  const machine = await this.machineRepository.findOne({
    where: { code, status: true },
  });

  if (!machine) {
    ThrowHTTPException(
      'Machine not found',
      ['code'],
      'NOT_FOUND',
      'Not Found',
    );
  }

  return {
    success: true,
    message: 'Machine id',
    data: machine.id,
  };
}
 public async getMachineById(id: string): Promise<Machine> {
    const machine = await this.machineRepository.findOne({ where: { id, status: true} });

    if (!machine) {
      ThrowHTTPException(
        'machine not found',
        ['id'],
        'NOT_FOUND',
        'Not Found',
      );
    } return machine;
  }




}