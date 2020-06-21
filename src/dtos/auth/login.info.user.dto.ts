export class LoginInfoUserDto {
    username: string;
    userId: number;
    token: string;
    constructor(id: number, un: string, token: string){
        this.userId = id;
        this.username = un;
        this.token = token;
    }
}