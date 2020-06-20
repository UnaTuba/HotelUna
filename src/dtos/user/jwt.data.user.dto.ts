export class JwtDataUserDto{
    role: "user";
    userId: number;
    username: string;
    ext: number; //UNIX TIMESTAMP
    ip: string;
    ua: string;

    toPlainObject(){
        return{
            role: this.role,
            userId: this.userId,
            username: this.username,
            ext: this.ext, //UNIX TIMESTAMP
            ip: this.ip,
            ua: this.ua
        }
    }
}