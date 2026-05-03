import { Category } from "src/products/entities/category.entity";
import { Option } from "src/products/entities/option.entity"
import { OrderDetail } from "src/orders/entities/order-detail.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    sku!: string;

    @Column()
    name!: string;

    @Column('decimal')
    price!: number;

    @Column('decimal')
    weight!: number;

    @Column('text')
    descriptions!: string;

    @Column()
    thumbnail!: string;

    @Column()
    image!: string;

    @Column()
    stock!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date!: Date;

    // Relación con Categorías
    @ManyToMany(() => Category)
    @JoinTable({ name: 'product_categories' })
    categories!: Category[];

    // Relación con Opciones
    @ManyToMany(() => Option)
    @JoinTable({ name: 'product_options' })
    options!: Option[];

    @OneToMany(() => OrderDetail, (detail) => detail.product)
    orderDetails!: OrderDetail[];
}
