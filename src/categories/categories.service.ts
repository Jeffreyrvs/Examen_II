import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor (@InjectRepository(Category) private repoCategory: Repository<Category>,) { }

  create(createCategoryDto: CreateCategoryDto): Promise <Category> {
    const category = this.repoCategory.create(createCategoryDto);
    return this.repoCategory.save(category);
  }

  findAll(): Promise <Category []> {
    return this.repoCategory.find();
  }

  async findOne(id: number): Promise <Category> {
    const category = await this.repoCategory.findOneBy( { id } );
    if (!category) {
      throw new NotFoundException('Category no encontrado');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise <Category | null> {
    await this.repoCategory.update(id, updateCategoryDto);
    return this.repoCategory.findOneBy( {id} );
  }

  async remove(id: number): Promise <void> {
    await this.repoCategory.delete(id);
  }
}
