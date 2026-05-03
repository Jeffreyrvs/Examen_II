import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor (@InjectRepository(Order) private repoOrder: Repository<Order>,) { }

  create(createOrderDto: CreateOrderDto): Promise <Order> {
    const order = this.repoOrder.create(createOrderDto);
    return this.repoOrder.save(order);
  }

  findAll(): Promise <Order []> {
    return this.repoOrder.find();
  }

  async findOne(id: number): Promise <Order> {
    const order = await this.repoOrder.findOneBy( { id } );
    if (!order) {
      throw new NotFoundException('Order no encontrado');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise <Order | null> {
    await this.repoOrder.update(id, updateOrderDto);
    return this.repoOrder.findOneBy( {id} );
  }

  async remove(id: number): Promise <void> {
    await this.repoOrder.delete(id);
  }
}
