export class AddClientDto {
    forename: string;
    surname: string;
    email: string;
    phone: string;
    rentables: {
        rentableId: number;
        value: string;
    }[];
}