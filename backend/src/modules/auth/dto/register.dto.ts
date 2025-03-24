import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    IsIn,
    ValidateIf,
  } from "class-validator";
  import { IsName } from "src/decorators/name-validator.decorator";
  import { IsRut } from "src/decorators/rut-validator-decorator";
  import { UserRole } from "src/enum/userRole";
  import { IsPassword } from "src/decorators/password-validator.decorator";  
  export class RegisterDto {
    @IsString({ message: "The name must be a string." })
    @IsName({ message: "The name is not valid." })
    @Length(2, 35, {
      message: "The name must be between 2 and 35 characters.",
    })
    @IsNotEmpty({ message: "The name cannot be empty." })
    name: string = "";
  
    @IsString({
      message: "The last name must be a string.",
    })
    @IsName({ message: "The last name is not valid." })
    @Length(2, 35, {
      message: "The last name must be between 2 and 35 characters.",
    })
    @IsNotEmpty({ message: "The last name cannot be empty." })
    lastName: string = "";
  
    @IsString({ message: "The email must be a string." })
    @IsEmail({}, { message: "The email is not valid." })
    @IsNotEmpty({ message: "The email cannot be empty." })
    email: string = "";
    @IsNotEmpty({ message: 'cannot be empty ' })
  @IsString({
    message: ' password must be characters.',
  })
  @Length(8, 35, {
    message: 'password must be characters.',
  })
  @IsPassword({
    message:
      '',
  })
  password: string = '';

  @IsString({
    message:
      '',
  })
  @IsNotEmpty({
    message:
      '',
  })
  @Length(8, 35, {
    message:
      '',
  })
  passwordConfirmation: string = '';
  
    @IsString({ message: "The RUT must be a string." })
    @IsRut({ message: "The RUT is not valid." })
    @IsNotEmpty({ message: "The RUT cannot be empty." })
    rut: string = "";
  
    @IsNotEmpty({ message: "The role cannot be empty." })
    @IsIn(
      [
        UserRole.SYSTEM_ADMIN,
        UserRole.NORMAL_USER
      ],
      {
        message: "The role must be one of the allowed values: 1 or 2",
      },
    )
    role: UserRole;
  

  }