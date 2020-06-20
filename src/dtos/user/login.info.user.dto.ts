export class LogInfoUserDto {
    userId: number;
    username: string;
    token: string;
    constructor(id: number, un: string,tk: string){
        this.userId = id;
        this.username = un;
        this.token = tk;
    }
}