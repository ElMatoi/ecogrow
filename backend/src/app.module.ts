import { Module } from '@nestjs/common';
import { getEnvValue } from './config/config.service';
import { TypeOrmModule
} from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/user/entities/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getEnvValue('DATABASE_HOST'),
      port: +getEnvValue('DATABASE_PORT'),
      username: getEnvValue('DATABASE_USERNAME'),
      password: getEnvValue('DATABASE_PASSWORD'),
      database: getEnvValue('DATABASE_NAME'),
      entities: [User],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
