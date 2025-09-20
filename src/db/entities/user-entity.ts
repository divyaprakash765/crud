import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 200})
    name: string;

    @Column({type: 'varchar', length: 200, unique: true})
    email: string;

    @Column({type: 'varchar', length: 200})
    password: string;
    
}
