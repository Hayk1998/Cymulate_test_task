import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
    private readonly secret: string;

    constructor(private readonly configService: ConfigService) {
        this.secret = this.configService.get<string>('JWT_SECRET');
    }

    generateToken(_id: string, email: string): string {
        const payload = { email, _id };
        return jwt.sign(payload, this.secret, { expiresIn: '1h' });
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            return null;
        }
    }
}
