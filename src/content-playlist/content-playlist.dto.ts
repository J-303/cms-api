import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateContentPlaylistDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    position: number;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    duration: number;
}

export class UpdateContentPlaylistDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    position?: number;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    duration?: number;
}

export class ResponseContentPlaylistDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    position: number;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    duration: number;
}