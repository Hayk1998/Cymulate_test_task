import {BadRequestException, Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../validation/CreateUserValidationSchema";
import {JwtService} from "./jwt.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        const { fullName, password, email } = body;
        const existingUser = await this.userService.findUserByEmail(email);
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }
        const user = await this.userService.createUser(email, fullName, password);
        const token = this.jwtService.generateToken(user._id.toString(), email);
        return { token, userId: user._id, email: user.email };
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const { email, password } = body;

        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        await this.userService.validatePassword(password, user.password);

        const token = this.jwtService.generateToken(user._id.toString(), email);



        return { token, message: 'Login successful', userId: user._id, email: user.email };
    }
}
