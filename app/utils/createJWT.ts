import jsonwebtoken from 'jsonwebtoken';

export const createJWT = (userId: number): string => {
    const token = jsonwebtoken.sign({
        id: userId
    }, process.env.JWT_TOKEN!);
    return token;
}