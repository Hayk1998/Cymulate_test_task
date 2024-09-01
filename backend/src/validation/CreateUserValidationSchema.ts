import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password is too short. Minimum length is 6 characters' })
    password: string;

    @MinLength(6, { message: 'FullName is too short. Minimum length is 6 characters' })
    fullName: string;
}
