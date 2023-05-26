import * as bcrypt from "bcrypt";

export function makeHashValue(data: string) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(data, salt);
    return hash;
}

export function hashAndCompare(data: string, hash: string) {
    return bcrypt.compareSync(data, hash);
}