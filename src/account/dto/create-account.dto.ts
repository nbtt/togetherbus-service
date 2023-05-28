import { IsEmail, IsString, Length, Matches } from "class-validator";

export class CreateAccountDTO {
    @Matches(/^0[0-9]{9}$/, {
        message: 'Phone number must be 10 digits and start with 0.',
    })
    phone: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @Length(8, 20)
    password: string;
}