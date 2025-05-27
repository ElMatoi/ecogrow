import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMachineDto {
  @IsString({ message: ' Code must be a string.' })
 @IsNotEmpty({ message: 'forgot Code.' })
  code: string = '';
}

