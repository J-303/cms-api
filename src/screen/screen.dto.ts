import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateScreenDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    eventId: number;
}

export class UpdateScreenDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;
}

export class ResponseScreenDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}