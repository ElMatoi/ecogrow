import { IsNotEmpty, IsString } from 'class-validator';
import { IsRut } from 'src/decorators/rut-validator-decorator';
export class LoginDto {
  @IsString({ message: ' RUT must be a string.' })
  @IsRut({ message: ' RUT is not valid.' })
  @IsNotEmpty({ message: 'forgot your RUT.' })
  rut: string = '';

  @IsNotEmpty({ message: 'It looks like you forgot your password.' })
  @IsString({ message: ' password must be a string.' })
  password: string = '';
}
