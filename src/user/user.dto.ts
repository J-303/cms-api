import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

export class UpdateUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    username: string;
}

export class UserDTOResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;
}

export class LoginUserDTO {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}