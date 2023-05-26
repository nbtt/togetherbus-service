
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength } from 'class-validator';

export class ItemDto  {
    @ApiProperty({
        description:"bus route no"
    })
    @IsString()
    @MinLength(1)
    route: string;
    
    @ApiProperty({
        description:"cost value of this item"
    })
    @IsInt()
    @MinLength(1)
    amount: string;

    @ApiProperty({
        description:"discount of this item"
    })
    @IsInt()
    @MinLength(1)
    discount: string;

    @ApiProperty({
        description:"quantity of this item"
    })
    @IsInt()
    @MinLength(1)
    quantity: number;
}
