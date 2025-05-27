import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { Machine } from './entities/machine.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Machine]),
    
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    
  ],
  providers: [MachineService],
  controllers: [MachineController],
  exports: [MachineService, TypeOrmModule],
})
export class MachineModule {}