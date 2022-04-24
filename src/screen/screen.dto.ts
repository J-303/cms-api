import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateScreenDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    event_id: number;
}

export class UpdateScreenDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}

export class ResponseScreenDTO {
    @ApiProperty()
    name: string;
}