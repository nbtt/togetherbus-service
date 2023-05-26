import { MinLength, IsString} from "class-validator";
export class IdentifiyDto {

    @IsString()
    @MinLength(1)
    accountId: string;
}
