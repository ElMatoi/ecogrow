import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    
    forwardRef(() => AuthModule),
    
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}