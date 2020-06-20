import * as Validator from 'class-validator';

export class LoginUserDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    username: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(6, 128)
    password: string;

}