import * as bcrypt from "bcrypt";

export function getSuccessResponse() {
    return {
        timestamp: Date.now(),
        status: "SUCCESS",
    }
}

export function getCurrentNumericDate(): number {
    return Math.floor(Date.now() / 1000);
}

export function getDateFromNumericDate(numericDate: number): Date {
    return new Date(numericDate * 1000);
}

export function generateRandomString(length) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(length)].reduce(a=>a+chars[~~(Math.random()*chars.length)],'');
}

export function makeHashValue(data: string) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(data, salt);
    return hash;
}

export function hashAndCompare(data: string, hash: string) {
    return bcrypt.compareSync(data, hash);
}