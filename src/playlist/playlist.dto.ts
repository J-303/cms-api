import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaylistDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdatePlaylistDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;
}

export class ResponsePlaylistDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}