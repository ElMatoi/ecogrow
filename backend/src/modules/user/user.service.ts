import { Inject,Injectable,Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User
 } from "./entities/user.entity";
import { SuccessHTTPAnswer,ThrowHTTPException } from "src/utils/http.service";
import { UserRole } from "src/enum/userRole";
import { ResponseMessage } from "src/types/response";
import { MachineService } from "../machine/machine.service";

@Injectable ()
export class UserService{
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly machineService : MachineService

    ){}

async createUser(data: {
    name: string;
    lastName: string;
    email: string;
    rut: string;
    hashedPassword: string;
    role: UserRole
  }): Promise<User> {
    const newUser = new User();

    newUser.name = data.name;
    newUser.lastName = data.lastName;
    newUser.email = data.email;
    newUser.rut = data.rut;
    newUser.password = data.hashedPassword; 
    newUser.role = data.role;
    return await this.userRepository.save(newUser);
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email , status: false} });

    if (!user) {
      ThrowHTTPException(
        'El usuario no existe',
        ['email'],
        'NOT_FOUND',
        'Not Found',
      );
    }

    return user;
  }
  public async getIdeUser (id:string):Promise<ResponseMessage<User>>{
    const user = await this.userRepository.findOne({where: {id,status:true}})
    if (!user){
      ThrowHTTPException(
        'User not found',
        ['Id'],
        'NOT_FOUND',
        'Not found',
      );
    }
    return SuccessHTTPAnswer('Retrieved data user',user)
  }

  public async getUserByRut (rut:string): Promise<User>{
    const user = await this.userRepository.findOne({ where: { rut , status: true} });
    if (!user) {
      ThrowHTTPException(
        'El usuario no existe',
        ['rut'],
        'NOT_FOUND',
        'Not Found',
      );
    }

    return user;
  }
  public async getUserById(id: string): Promise<ResponseMessage<User>> {
    const user = await this.userRepository.findOne({ where: { id, status: true} });

    if (!user) {
      ThrowHTTPException(
        'El usuario no existe',
        ['rut'],
        'NOT_FOUND',
        'Not Found',
      );
    } return SuccessHTTPAnswer('Usuario encontrado', user);
  }
  async findUserByEmail(
    email: string,
    
  ): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email, status: true }});
  }

  async findUserByRut(
    rut: string,
    
  ): Promise<User | null> {
    return await this.userRepository.findOne({ where: { rut,status: true } });
  }



  async findUserByEmailOrRut(
    email: string,
    rut: string,
    ): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (user !== null) return user;
    return await this.findUserByRut(rut);
  }

 public async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id, status: true} });

    if (!user) {
      ThrowHTTPException(
        'El usuario no existe',
        ['rut'],
        'NOT_FOUND',
        'Not Found',
      );
    } return user;
  }

  async linkMachineUser(data: {
    userid:string,
    machineid:string
  }): Promise<ResponseMessage>{
    const user = await this.findUserById(data.userid)
    if (!user) {
      ThrowHTTPException(
        'El usuario no existe',
        ['rut'],
        'NOT_FOUND',
        'Not Found',
      );
    }
    const machine = await this.machineService.getMachineById(data.machineid)
     if (!machine) {
      ThrowHTTPException(
        'machine not found',
        ['id'],
        'NOT_FOUND',
        'Not Found',
      );
    }
    user.machine=machine
    return SuccessHTTPAnswer("Linked machine - user", undefined);

 }
}
