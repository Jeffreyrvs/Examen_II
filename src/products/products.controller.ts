import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,) {}

  // --- PRODUCTS ---
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productsService.findOneProduct(+id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(+id, updateProductDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }

  // --- OPTIONS ---
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER)
  @Post('/options')
  createOption(@Body() createOptionDto: CreateOptionDto) {
    return this.productsService.createOption(createOptionDto);
  }

  @Get('/options')
  findAllOptions() {
    return this.productsService.findAllOptions();
  }

  @Get('/options:id')
  findOneOption(@Param('id') id: string) {
    return this.productsService.findOneOption(+id);
  }

  @Patch('/options:id')
  updateOption(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.productsService.updateOption(+id, updateOptionDto);
  }

  @Delete('/options:id')
  removeOption(@Param('id') id: string) {
    return this.productsService.deleteOption(+id);
  }

  // --- CATEGORY ---
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER)
  @Post('/categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Get('/categories')
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('/categories:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneCategory(+id);
  }

  @Patch('/categories:id')
  update(@Param('id') id: string, @Body() UpdateCategoryDto: UpdateCategoryDto) {
    return this.productsService.updateCategory(+id, UpdateCategoryDto);
  }

  @Delete('/categories:id')
  remove(@Param('id') id: string) {
    return this.productsService.deleteCategory(+id);
  }
}
