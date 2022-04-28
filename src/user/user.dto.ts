import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UpdateUserDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username?: string;
}

export class LoginUserDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    password: string;
}

export class ResponseUserDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string;
}