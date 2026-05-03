import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('order_details')
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('decimal')
    price!: number;

    @Column()
    sku!: string;

    @Column()
    quantity!: number;

    @ManyToOne(() => Order, (order) => order.details)
    @JoinColumn({ name: 'order_id' })
    order: Order | undefined;

    @ManyToOne(() => Product, (product) => product.orderDetails)
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}
