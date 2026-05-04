import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'CREAR CUSTOMER', 
    description: 'Solo el Admin o el Developer puede realizar esta operación.' 
  })
  @ApiOkResponse({ type: CreateCustomerDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER, Role.ADMIN)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER TODOS LOS CUSTOMERS', 
    description: 'Todos los usuarios que hayan iniciado sesion pueden realizar esta operacion.' 
  })
  @ApiOkResponse({ description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER UN CUSTOMER POR ID', 
    description: 'Obtención de datos mediante id.' 
  })
  @ApiOkResponse({ type: CreateCustomerDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ACTUALIZAR UN CUSTOMER', 
    description: 'Actualizacion de datos mediante id.' 
  })
  @ApiOkResponse({ type: UpdateCustomerDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.DEVELOPER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ELIMINAR CUSTOMER', 
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
    return this.customersService.remove(+id);
  }
}
