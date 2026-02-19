import bcrypt, { genSalt } from "bcrypt";

export const generateHashPassword = async (password) => {
    const salt = await genSalt(10);

    const hashpasword = await bcrypt.hash(password, salt);
    return hashpasword;

};

export const compareHashedPassword = async (password, dbpassword) => {
    const comparePassword = await bcrypt.compare(password, dbpassword);
    return comparePassword;
};