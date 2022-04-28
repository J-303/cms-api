import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsOptional, IsUrl } from "class-validator";

export class CreateContentDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsUrl()
    url: string;
}

export class UpdateContentDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    name?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    url?: string;
}

export class ResponseContentDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsUrl()
    url: string;
}