import { LoginInfoUserDto } from "src/dtos/auth/login.info.user.dto";

export class ApiResponse {
    status: string;
    statusCode: number;
    message: string | LoginInfoUserDto | null ;

    constructor(status: string, statusCode: number, message: string | LoginInfoUserDto | null = null){
        this.status = status;
        this.statusCode=statusCode;
        this.message = message;
    }
}