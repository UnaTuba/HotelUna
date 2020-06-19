import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn({ name: 'client_id', type: 'int', unsigned: true })
    clientId: number;

    @Column({ type: 'varchar', length: 255 })
    forename: string;

    @Column({ type: 'varchar', length: 255 })
    surname: string;

    @Column({ type: 'varchar', length: 64 })
    email: string;

    @Column({ type: 'text' })
    phone: string;

}