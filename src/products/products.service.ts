import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Option } from './entities/option.entity';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class ProductsService {
  constructor (
    @InjectRepository(Product) private repoProduct: Repository<Product>,
    @InjectRepository(Option) private repoOption: Repository<Option>,
    @InjectRepository(Category) private repoCategory: Repository<Category>,
    ) { }

  // Métodos para Products
  createProduct(createProductDto: CreateProductDto): Promise <Product> {
    const product = this.repoProduct.create(createProductDto);
    return this.repoProduct.save(product);
  }

  findAllProducts(): Promise <Product []> {
    return this.repoProduct.find();
  }

  async findOneProduct(id: number): Promise <Product> {
    const product = await this.repoProduct.findOneBy( { id } );
    if (!product) {
      throw new NotFoundException('Product no encontrado');
    }
    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise <Product | null> {
    await this.repoProduct.update(id, updateProductDto);
    return this.repoProduct.findOneBy( {id} );
  }

  async deleteProduct(id: number): Promise <void> {
    await this.repoProduct.delete(id);
  }

  // Métodos para Options
  createOption(createOptionDto: CreateOptionDto): Promise <Option> {
    const option = this.repoOption.create(createOptionDto);
    return this.repoOption.save(option);
  }

  findAllOptions(): Promise <Option []> {
    return this.repoOption.find();
  }

  async findOneOption(id: number): Promise <Option> {
    const option = await this.repoOption.findOneBy( { id } );
    if (!option) {
      throw new NotFoundException('Option no encontrado');
    }
    return option;
  }

  async updateOption(id: number, updateOptionDto: UpdateOptionDto): Promise <Option | null> {
    await this.repoOption.update(id, updateOptionDto);
    return this.repoOption.findOneBy( {id} );
  }

  async deleteOption(id: number): Promise <void> {
    await this.repoOption.delete(id);
  } 

  // Métodos para Categories
  createCategory(createCategoryDto: CreateCategoryDto): Promise <Category> {
    const category = this.repoCategory.create(createCategoryDto);
    return this.repoOption.save(category);
  }

  findAllCategories(): Promise <Category []> {
    return this.repoCategory.find();
  }

  async findOneCategory(id: number): Promise <Category> {
    const category = await this.repoCategory.findOneBy( { id } );
    if (!category) {
      throw new NotFoundException('Category no encontrado');
    }
    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise <Category | null> {
    await this.repoCategory.update(id, updateCategoryDto);
    return this.repoCategory.findOneBy( {id} );
  }

  async deleteCategory(id: number): Promise <void> {
    await this.repoCategory.delete(id);
  } 
}
