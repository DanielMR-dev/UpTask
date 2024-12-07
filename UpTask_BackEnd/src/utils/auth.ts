import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10); // Se genera un salt para hashear el password
    return await bcrypt.hash(password, salt); // Se hashea el password con el salt
};