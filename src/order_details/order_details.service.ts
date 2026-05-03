import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { OrderDetail } from './entities/order_detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class OrderDetailsService {
  constructor (@InjectRepository(OrderDetail) private repoOrderDetail: Repository<OrderDetail>,) { }

  create(createOrderDetailDto: CreateOrderDetailDto): Promise <OrderDetail> {
    const order_detail = this.repoOrderDetail.create(createOrderDetailDto);
    return this.repoOrderDetail.save(order_detail);
  }

  findAll(): Promise<OrderDetail []> {
    return this.repoOrderDetail.find();
  }

  async findOne(id: number): Promise <OrderDetail> {
    const order_detail = await this.repoOrderDetail.findOneBy( { id } );
    if (!order_detail) {
      throw new NotFoundException('Order Detail no encontrado');
    }
    return order_detail;
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto): Promise <OrderDetail | null> {
    await this.repoOrderDetail.update(id, updateOrderDetailDto);
    return this.repoOrderDetail.findOneBy( {id} );
  }

  async remove(id: number): Promise <void> {
    await this.repoOrderDetail.delete(id);
  }
}
