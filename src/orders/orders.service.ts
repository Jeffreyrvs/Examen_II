import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly dataSource: DataSource, 
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { details, customer_id, ...orderData } = createOrderDto;

    // Transacción
    return await this.dataSource.transaction(async (manager) => {
      
      // 1. Crear y guardar la cabecera de la Orden
      const order = manager.create(Order, {
        ...orderData,
        customer: { id: customer_id }, // Relación con la tabla customers
      });
      const savedOrder = await manager.save(order);

      // 2. Mapear y guardar los detalles vinculados a esa orden
      const orderDetails = details.map((item) => {
        return manager.create(OrderDetail, {
          price: item.price,
          quantity: item.quantity,
          sku: item.sku,
          order: savedOrder, // Vinculación automática con el ID de la orden recién creada
          product: { id: item.product_id }, // Relación con la tabla products
        });
      });

      await manager.save(OrderDetail, orderDetails);

      return {
        ...savedOrder,
        details: orderDetails,
      };
    });
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['details', 'customer', 'details.product'], // Mostratr los detalles, el cliente y el nombre del producto
      order: { order_date: 'DESC' }
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['details', 'customer', 'details.product']
    });

    if (!order) {
      throw new NotFoundException('La orden no existe');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    // Verificar que exisa la orden
    const order = await this.findOne(id);

    // Fusionar los cambios
    const updatedOrder = this.orderRepository.merge(order, updateOrderDto);
    
    return await this.orderRepository.save(updatedOrder);
  }

  async remove(id: number): Promise <void> {
    await this.orderRepository.delete(id);
  }
}
