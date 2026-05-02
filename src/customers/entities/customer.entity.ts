import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false }) // Por seguridad
    password!: string;

    @Column()
    full_name!: string;

    @Column()
    billing_address!: string;

    @Column()
    default_shipping_address!: string;

    @Column()
    country!: string;

    @Column()
    phone!: string;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[] | undefined;
}
