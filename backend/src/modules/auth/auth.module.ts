import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvValue } from '../../config/config.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../../guards/jwt.strategy';
import { User } from '../user/entities/user.entity';
import { Machine } from '../machine/entities/machine.entity';
import { MachineModule } from '../machine/machine.module';
import { MachineService } from '../machine/machine.service';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: getEnvValue('JWT_SECRET'),
      signOptions: {
        expiresIn: getEnvValue('JWT_EXP'),
        algorithm: getEnvValue('JWT_ALG'),
      },
    }),
    TypeOrmModule.forFeature([User,Machine]),
    forwardRef(() => UserModule),
    forwardRef(() => MachineModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy,MachineService],
  exports: [AuthService]
})
export class AuthModule {}