import { User } from '../entities/User';
import jsonwebtoken from 'jsonwebtoken';

export const decodeJWT = async (token: string): Promise<User | undefined> => {
    console.log('Inside Decode JWT');
    try {
        const decoded: any = jsonwebtoken.verify(token, process.env.JWT_TOKEN!);
        const { id } = decoded;
        const user = await User.findOne({ id });
        return user;
    } catch (error) {
        return undefined;
    }
}