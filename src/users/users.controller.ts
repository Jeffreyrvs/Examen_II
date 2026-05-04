import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/auth/dto/response-user.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'CREAR USUARIO', 
    description: 'Solo el Admin o el Developer puede realizar esta operación.' 
  })
  @ApiOkResponse({ type: ResponseUserDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'OBTENER USUARIO', 
    description: 'Admin y Developer pueden ver todos los usuario, USER solo puede ver su perfil.' 
  })
  @ApiOkResponse({ description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' })
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER, Role.ADMIN, Role.USER)
  async getProfile(@Req() req: Request) {
    const currentUser = req['user'] 

    // Si es ADMIN o DEVELOPER
    if (currentUser.role !== Role.USER) {
      return this.usersService.findAll();
    }

    // Si es USER
    return this.usersService.findOne(currentUser.id, currentUser);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'ACTUALIZAR UN USUARIO', 
    description: 'Actualizacion de datos mediante id.' 
  })
  @ApiOkResponse({ type: UpdateUserDto, description: 'Operación realizada con éxito.',}) 
  @ApiBadRequestResponse({ description: 'ID inválido o error en los parámetros.' }) 
  @ApiUnauthorizedResponse({ description: 'No autenticado.' }) 
  @ApiForbiddenResponse({ description: 'Acceso denegado por rol insuficiente.' }) 
  @ApiNotFoundResponse({ description: 'El recurso solicitado no existe.' }) 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/make-admin')
  asignarRol(@Param('id') id: string) {
    return this.usersService.promoverAdmin(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
