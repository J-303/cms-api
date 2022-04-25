import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUrl } from "class-validator";

export class CreateContentDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    url: string;
}

export class UpdateContentDTO {
    @ApiProperty()
    @IsNotEmpty()
    name?: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    url?: string;
}

export class ResponseContentDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    url: string;
}