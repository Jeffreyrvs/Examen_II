import { Customer } from "src/customers/entities/customer.entity";
import { OrderDetail } from "src/orders/entities/order-detail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('decimal')
    ammount!: number;

    @Column()
    shipping_address!: string;

    @Column()
    order_address!: string;

    @Column()
    order_email!: string;

    @Column({ type: 'timestamp' })
    order_date!: Date;

    @Column()
    order_status!: string;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    @JoinColumn({ name: 'customer_id' })
    customer!: Customer;

    @OneToMany(() => OrderDetail, (detail) => detail.order)
    details: OrderDetail[] | undefined;
}
