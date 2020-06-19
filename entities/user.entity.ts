import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id', type: 'int', unsigned: true })
    userId: number;

    @Column({ type: 'varchar', length: 64 })
    forename: string;

    @Column({ type: 'text' })
    surname: string;

    @Column({ type: 'varchar', length: 64 })
    address: string;

    @Column({ type: 'varchar', length: 64 })
    phone: string;

    @Column({ type: 'varchar', length: 64 })
    email: string;

    @Column({ type: 'varchar', length: 64, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 64 })
    password: string;

    @Column({ type: 'text' })
    salt: string;

    @Column({ name: 'registration_date', type: 'timestamp' })
    registrationDate: string;
}