import { IsNotEmpty, IsString } from 'class-validator';

export class LinkedMachineDto {
  @IsString({ message: ' Code must be a string.' })
 @IsNotEmpty({ message: 'forgot Code.' })
  machineid: string = '';
}

