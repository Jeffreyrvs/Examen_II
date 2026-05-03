import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Option } from './entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OptionsService {
  constructor (@InjectRepository(Option) private repoOption: Repository<Option>,) { }

  create(createOptionDto: CreateOptionDto): Promise <Option> {
    const option = this.repoOption.create(createOptionDto);
    return this.repoOption.save(option);
  }

  findAll(): Promise <Option []> {
    return this.repoOption.find();
  }

  async findOne(id: number): Promise <Option> {
    const pais = await this.repoOption.findOneBy( { id } );
    if (!pais) {
      throw new NotFoundException('Option no encontrado');
    }
    return pais;
  }

  async update(id: number, updateOptionDto: UpdateOptionDto): Promise <Option | null> {
    await this.repoOption.update(id, updateOptionDto);
    return this.repoOption.findOneBy( {id} );
  }

  async remove(id: number): Promise <void> {
    await this.repoOption.delete(id);
  }
}
