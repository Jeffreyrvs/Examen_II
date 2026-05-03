import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor (@InjectRepository(Product) private repoProduct: Repository<Product>,) { }

  create(createProductDto: CreateProductDto): Promise <Product> {
    const product = this.repoProduct.create(createProductDto);
    return this.repoProduct.save(product);
  }

  findAll(): Promise <Product []> {
    return this.repoProduct.find();
  }

  async findOne(id: number): Promise <Product> {
    const product = await this.repoProduct.findOneBy( { id } );
    if (!product) {
      throw new NotFoundException('Product no encontrado');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise <Product | null> {
    await this.repoProduct.update(id, updateProductDto);
    return this.repoProduct.findOneBy( {id} );
  }

  async remove(id: number): Promise <void> {
    await this.repoProduct.delete(id);
  }
}
