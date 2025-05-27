import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { MachineModule } from '../machine/machine.module';
import { Machine } from '../machine/entities/machine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Machine]),
    
    forwardRef(() => AuthModule),
    forwardRef(() => MachineModule),
    
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}