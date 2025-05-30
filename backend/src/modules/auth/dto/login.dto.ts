import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class LoginDto {
  @IsString({ message: "The email must be a string." })
     @IsEmail({}, { message: "The email is not valid." })
     @IsNotEmpty({ message: "The email cannot be empty." })
     email: string = "";

  @IsNotEmpty({ message: 'It looks like you forgot your password.' })
  @IsString({ message: ' password must be a string.' })
  password: string = '';
}
