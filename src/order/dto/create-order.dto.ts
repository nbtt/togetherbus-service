import { MinLength, IsString, IsArray, ArrayMinSize, ValidateNested } from "class-validator";
import { ItemDto } from "./item.dto";
import { ApiProperty } from "@nestjs/swagger";
export class CreateOrderDto {
    @ApiProperty({
        description: "account Phone of user",
        example: "000000000"  
    })
    @IsString()
    @MinLength(1)
    accountId: string;
    
    @ApiProperty({
            description: "items of this Order",
            example: [{
                "route": "01",  // route bus string
                "amount": "100000", // total amount string bigint
                "discount": "0", // discount string bigint
                "quantity": 1, // quantity number integer
            }],
            isArray: true,
            type: ItemDto
        }
    )
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    items: ItemDto[];
    
}
