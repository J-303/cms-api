import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateContentPlaylistDTO {
    @ApiProperty()
    @IsNumber()
    position: number;

    @ApiProperty()
    @IsNumber()
    duration: number;
}

export class UpdateContentPlaylistDTO {
    @ApiProperty()
    @IsNumber()
    position?: number;

    @ApiProperty()
    @IsNumber()
    duration?: number;
}

export class ResponseContentPlaylistDTO {
    @ApiProperty()
    @IsNumber()
    position: number;

    @ApiProperty()
    @IsNumber()
    duration: number;
}