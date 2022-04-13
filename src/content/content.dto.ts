import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateContentDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    url: string;
}

export class UpdateContentDTO {
    @ApiProperty()
    name?: string;
    
    @ApiProperty()
    @IsUrl()
    url?: string;
}