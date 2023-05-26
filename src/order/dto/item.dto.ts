
import { IsInt, IsString, MinLength } from 'class-validator';

export class ItemDto  {
    @IsString()
    @MinLength(1)
    route: string;
    
    @IsInt()
    @MinLength(1)
    amount: string;

    @IsInt()
    @MinLength(1)
    discount: string;

    @IsInt()
    @MinLength(1)
    quantity: number;
}
