import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaylistDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    event_id: number;
}

export class UpdatePlaylistDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}