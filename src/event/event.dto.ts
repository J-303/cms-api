import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateEventDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}

export class UpdateEventDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}

export class ResponseEventDTO {
    @ApiProperty()
    name: string;
}