import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateContentPlaylistDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    position: number;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    duration: number;
}

export class UpdateContentPlaylistDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    position?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    duration?: number;
}

export class ResponseContentPlaylistDTO {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    position: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    duration: number;
}