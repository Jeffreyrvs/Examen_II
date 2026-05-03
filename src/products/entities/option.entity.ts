import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('options')
export class Option {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    option_name!: string;
}