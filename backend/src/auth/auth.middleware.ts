import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    async use(request: Request, res: Response, next: NextFunction) {
        const authHeader = request.headers.authorization;
        const excludedRoutes = ['/auth/login', '/public']; // Add routes to be excluded here

        if (request.url.includes('/detect')) {
            return next();
        }
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid authorization format');
        }

        try {
            const decodedToken = this.jwtService.verifyToken(token);

            if (!decodedToken) {
                throw new UnauthorizedException('Invalid or expired token');
            }

            // Attach the decoded token data to the request object (optional)
            request['user'] = decodedToken;

            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
