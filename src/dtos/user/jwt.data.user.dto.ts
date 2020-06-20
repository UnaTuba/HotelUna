export class JwtDataUserDto{
    userId: number;
    username: string;
    ext: number; //UNIX TIMESTAMP
    ip: string;
    ua: string;

    toPlainObject(){
        return{
            userId: this.userId,
            username: this.username,
            ext: this.ext, //UNIX TIMESTAMP
            ip: this.ip,
            ua: this.ua
        }
    }
}