import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'CREAR ORDER', 
    description: 'Solo el Admin o el Developer puede realizar esta operación.' 
  })
  @ApiOkResponse({ type: CreateOrderDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER, Role.ADMIN)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER TODAS LAS ORDERS', 
    description: 'Todos los usuarios que hayan iniciado sesion pueden realizar esta operacion.' 
  })
  @ApiOkResponse({ description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER UNA ORDER POR ID', 
    description: 'Obtención de datos mediante id.' 
  })
  @ApiOkResponse({ type: CreateOrderDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ACTUALIZAR UNA ORDEN', 
    description: 'Actualizacion de datos mediante id.' 
  })
  @ApiOkResponse({ type: UpdateOrderDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DEVELOPER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ELIMINAR ORDEN', 
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
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
