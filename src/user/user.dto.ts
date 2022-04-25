import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UpdateUserDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;
}

export class LoginUserDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class ResponseUserDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;
}