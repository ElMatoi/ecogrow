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
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}