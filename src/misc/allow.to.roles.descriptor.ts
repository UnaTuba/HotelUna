import { SetMetadata } from "@nestjs/common";

export const AllowToRoles = (...roles: ("user")[]) => {
    return SetMetadata('allow_to_roles',roles);
};
//obzirom da imam samo jednu ulogu, ovo je potpuno nepotrebno