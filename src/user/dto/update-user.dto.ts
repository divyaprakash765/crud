import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {

    @IsString()
    name? : string;

    @IsString()
    email? : string;

}