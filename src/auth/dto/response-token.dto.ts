import { ApiProperty } from "@nestjs/swagger";

export class ResponseTokenDto {
    @ApiProperty()
    access_token!: string;
}