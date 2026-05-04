import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';
import { ResponseTokenDto } from './dto/response-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Registro de usuario
  @ApiOperation({ 
    summary: 'REGISTRO DE USUARIO', 
    description: 'Cualquier persona se puede registrar.' 
  })
  @ApiBody({type: CreateUserDto})
  @ApiCreatedResponse({ type: ResponseUserDto, description: 'El registro se ha creado exitosamente.' }) 
  @ApiBadRequestResponse({ description: 'Datos inválidos o faltantes en la petición.' }) 
  @ApiForbiddenResponse({ description: 'No tienes los permisos (roles) necesarios.' }) 
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  // Inicio de sesion
  @ApiOperation({ 
    summary: 'INICIO DE SESION', 
    description: 'Cualquier usuario previamente registrado puede iniciar sesion.' 
  })
  @ApiBody({type: LoginUserDto})
  @ApiCreatedResponse({ type: ResponseTokenDto, description: 'Se ha iniciado sesion exitosamente.' }) 
  @ApiBadRequestResponse({ description: 'Datos inválidos o faltantes en la petición.' }) 
  @ApiUnauthorizedResponse({ description: 'Credenciales de acceso incorrectas.' }) 
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

}
