import { IsInt, Matches } from "class-validator";

export class QueryByPhone {
    @Matches(/^0[0-9]{9}$/, {
        message: 'Phone number must be 10 digits and start with 0.',
    })
    phone: string;
}
