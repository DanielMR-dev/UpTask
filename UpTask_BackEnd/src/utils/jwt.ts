import jwt from "jsonwebtoken";

export const generateJWT = () => {
    const data = {
        name: 'Daniel',
        credit_card: '1223445231',
        password: 'password'
    };

    const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '5m'
    });
    return token;
};