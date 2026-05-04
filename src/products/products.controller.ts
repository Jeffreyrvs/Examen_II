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
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,) {}

  // --- METODOS GET ALL ---
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER TODOS LOS PRODUCTOS', 
    description: 'Todos los usuarios que hayan iniciado sesion pueden realizar esta operacion.' 
  })
  @ApiOkResponse({ description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER TODAS LAS OPCIONES', 
    description: 'Todos los usuarios que hayan iniciado sesion pueden realizar esta operacion.' 
  })
  @ApiOkResponse({ description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get('/options')
  findAllOptions() {
    return this.productsService.findAllOptions();
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER TODAS LAS CATEGORIAS', 
    description: 'Todos los usuarios que hayan iniciado sesion pueden realizar esta operacion.' 
  })
  @ApiOkResponse({ description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get('/categories')
  findAllCategories() {
    return this.productsService.findAllCategories();
  }

  // --- METODOS DE CREACION --- 
   
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'CREAR PRODUCT', 
    description: 'Solo el Admin o el Developer puede realizar esta operación.' 
  })
  @ApiOkResponse({ type: CreateProductDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER, Role.ADMIN)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'CREAR OPTION', 
    description: 'Solo el Admin o el Developer puede realizar esta operación.' 
  })
  @ApiOkResponse({ type: CreateOptionDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER, Role.ADMIN)
  @Post('/options')
  createOption(@Body() createOptionDto: CreateOptionDto) {
    return this.productsService.createOption(createOptionDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'CREAR CATEGORY', 
    description: 'Solo el Admin o el Developer puede realizar esta operación.' 
  })
  @ApiOkResponse({ type: CreateCategoryDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER, Role.ADMIN)
  @Post('/categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  // -- OBTENER POR ID ---

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER UNA CATEGORIA POR ID', 
    description: 'Obtención de datos mediante id.' 
  })
  @ApiOkResponse({ type: CreateProductDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get('/categories/:id')
  findOneCategory(@Param('id') id: string) {
    return this.productsService.findOneCategory(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER UNA OPCION POR ID', 
    description: 'Obtención de datos mediante id.' 
  })
  @ApiOkResponse({ type: CreateOptionDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get('/options/:id')
  findOneOption(@Param('id') id: string) {
    return this.productsService.findOneOption(+id);
  }

  // --- METODOS DE ACTUALIZACION ---

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ACTUALIZAR UN PRODUCTO', 
    description: 'Actualizacion de datos mediante id.' 
  })
  @ApiOkResponse({ type: UpdateProductDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER, Role.ADMIN)
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(+id, updateProductDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ACTUALIZAR UNA OPCION', 
    description: 'Actualizacion de datos mediante id.' 
  })
  @ApiOkResponse({ type: UpdateOptionDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DEVELOPER)
  @Patch('/options/:id')
  updateOption(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.productsService.updateOption(+id, updateOptionDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ACTUALIZAR UNA CATEGORIA', 
    description: 'Actualizacion de datos mediante id.' 
  })
  @ApiOkResponse({ type: UpdateProductDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DEVELOPER)
  @Patch('/categories/:id')
  update(@Param('id') id: string, @Body() UpdateCategoryDto: UpdateCategoryDto) {
    return this.productsService.updateCategory(+id, UpdateCategoryDto);
  }

  // --- METODOS DE ELIMINAR --- 

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ELIMINAR PRODUCTO', 
    description: 'Elimina un registro de forma permanente de la base de datos de Aiven.' 
  })
  @ApiOkResponse({ description: 'El registro ha sido eliminado correctamente.' }) 
  @ApiBadRequestResponse({ description: 'El formato del ID proporcionado es inválido.' }) 
  @ApiUnauthorizedResponse({ description: 'No se proporcionó un token JWT válido.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado. Se requiere rol ADMIN para esta operación.' })  
  @ApiNotFoundResponse({ description: 'No se encontró ningún registro con el ID especificado.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ELIMINAR OPCION', 
    description: 'Elimina un registro de forma permanente de la base de datos de Aiven.' 
  })
  @ApiOkResponse({ description: 'El registro ha sido eliminado correctamente.' }) 
  @ApiBadRequestResponse({ description: 'El formato del ID proporcionado es inválido.' }) 
  @ApiUnauthorizedResponse({ description: 'No se proporcionó un token JWT válido.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado. Se requiere rol ADMIN para esta operación.' })  
  @ApiNotFoundResponse({ description: 'No se encontró ningún registro con el ID especificado.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/options/:id')
  removeOption(@Param('id') id: string) {
    return this.productsService.deleteOption(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ELIMINAR CATEGORIA', 
    description: 'Elimina un registro de forma permanente de la base de datos de Aiven.' 
  })
  @ApiOkResponse({ description: 'El registro ha sido eliminado correctamente.' }) 
  @ApiBadRequestResponse({ description: 'El formato del ID proporcionado es inválido.' }) 
  @ApiUnauthorizedResponse({ description: 'No se proporcionó un token JWT válido.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado. Se requiere rol ADMIN para esta operación.' })  
  @ApiNotFoundResponse({ description: 'No se encontró ningún registro con el ID especificado.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/categories/:id')
  remove(@Param('id') id: string) {
    return this.productsService.deleteCategory(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER UN PRODUCTO POR ID', 
    description: 'Obtención de datos mediante id.' 
  })
  @ApiOkResponse({ type: CreateProductDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productsService.findOneProduct(+id);
  }
}
