import { MinLength, IsString, IsArray, ArrayMinSize, ValidateNested } from "class-validator";
import { ItemDto } from "./item.dto";
export class CreateOrderDto {
    
    @IsString()
    @MinLength(1)
    accountPhone: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    items: ItemDto[];
    
}
