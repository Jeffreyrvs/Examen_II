import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor (@InjectRepository(Customer) private repoCustomer: Repository<Customer>,) { }

  create(createCustomerDto: CreateCustomerDto): Promise <Customer> {
    const customer = this.repoCustomer.create(createCustomerDto);
    return this.repoCustomer.save(customer);
  }

  findAll(): Promise <Customer []> {
    return this.repoCustomer.find();
  }

  async findOne(id: number): Promise <Customer> {
    const customer = await this.repoCustomer.findOneBy( { id } );
    if (!customer) {
      throw new NotFoundException('Customer no encontrado');
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise <Customer | null> {
    await this.repoCustomer.update(id, updateCustomerDto);
    return this.repoCustomer.findOneBy( {id} );
  }

  async remove(id: number): Promise <void> {
    await this.repoCustomer.delete(id);
  }
}
