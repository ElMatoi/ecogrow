import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { AccessTokenResponse } from 'src/types/auth';
import { JWTPayload } from '../../types/jwt';
import { getEnvValue } from '../../config/config.service';
import { SuccessHTTPAnswer, ThrowHTTPException } from '../../utils/http.service';
import { ResponseMessage } from '../../types/response';
import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}



async register(
    registerDto: RegisterDto,
  ): Promise<ResponseMessage<AccessTokenResponse>> {
    const { email, password, passwordConfirmation,lastName, name, rut, role } = registerDto;
    const existingUser = await this.userService.findUserByEmailOrRut(
      email,
      rut,
    );
    if (password !== passwordConfirmation)
        return ThrowHTTPException(
          'Las contraseñas no coinciden',
          ['password', 'passwordConfirmation'],
          'BAD_REQUEST',
          'Las contraseñas no coinciden',
        );
        if (existingUser !== null)
            return ThrowHTTPException(
              'El usuario ya existe',
              ['email', 'rut'],
              'CONFLICT',
              'Ya existe un usuario con este email o rut',
            );
    const newUser= await this.userService.createUser({
        name,
        lastName,
        email,
        rut,
        hashedPassword: await this.createHash(password),
        role
        
    })
    if (!newUser)
        return ThrowHTTPException(
            'Error al registrar usuario',
            ['email', 'rut'],
            'INTERNAL_SERVER_ERROR',
            'Error al registrar usuario',
          );
          const jwtPayload: JWTPayload = {
            email: newUser.email,
            id: newUser.id,
            role: newUser.role,
            rut: newUser.rut,
          };
          const accessToken = await this.generateAccessToken(jwtPayload);
          return SuccessHTTPAnswer<AccessTokenResponse>('Usuario registrado', {
            accessToken,
          });
        }

async login( loginDto: LoginDto):Promise<ResponseMessage<AccessTokenResponse>>{
    const {email,password}= loginDto;
    const user= await this.userService.findUserByEmail(email);
    if(!user) {
        return ThrowHTTPException(
          'Usuario no encontrado',
          ['email'],
          'NOT_FOUND',
          'No se encontró un usuario con el email proporcionado',
        );
      }
      const comparePass = await this.compareHash(password, user.password);
      if (!comparePass)
        return ThrowHTTPException(
          'Credenciales incorrectas',
          ['rut', 'password'],
          'UNAUTHORIZED',
          'Credenciales incorrectas',
        );
  
      const payload: JWTPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        rut: user.rut,
      };
      const accessToken = await this.generateAccessToken(payload);
  
      return SuccessHTTPAnswer<AccessTokenResponse>('¡Sesión iniciada!', {
        accessToken,
      });
    }

async createHash(element: string): Promise<string> {
    return await hash(
      element + getEnvValue('SECRET_SALT'),
      +getEnvValue('SALT_ROUNDS'),
    );
  }

  async compareHash(
    element: string,
    hashedElement: string,
  ): Promise<boolean> {
    return await compare(element + getEnvValue('SECRET_SALT'), hashedElement);
  }

  ThrowInvalidAccessTokenError(): never {
    ThrowHTTPException(
      'El token de acceso no es válido.',
      ['accessToken'],
      'UNAUTHORIZED',
      'Unauthorized',
    );
  }

  async generateAccessToken(payload: JWTPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async validateAccessToken(accessToken: string): Promise<JWTPayload> {
    try {
      return this.jwtService.verify<JWTPayload>(accessToken, {
        secret: getEnvValue('JWT_SECRET'),
      });
    } catch (error) {
      return this.ThrowInvalidAccessTokenError();
    }
  }
}
