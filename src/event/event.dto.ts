import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateEventDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;
}

export class ResponseEventDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}