import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { User } from 'src/auth/entities/user.entity';
import { Role } from 'src/auth/role.enum';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repoUser: Repository<User>,) {}

  create(createUserDto: CreateUserDto): Promise <User> {
    const user = this.repoUser.create(createUserDto);
    return this.repoUser.save(user);
  }

  async findOne(id: number, usuarioActual: any): Promise <User> {
    // Si es user verificar que sea el suyo
    if (usuarioActual.role == Role.USER && usuarioActual.sub != id) {
      throw new ForbiddenException('No tienes permiso para ver el perfil de otro usuario');
    }

    const user = await this.repoUser.findOneBy( {id} );

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findAll() {
    // Solo para ADMIN y Developer
    return await this.repoUser.find();
  }

  async promoverAdmin(id: number) {
    const user = await this.repoUser.findOneBy( {id} );
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }
    user.role = Role.ADMIN;
    return this.repoUser.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise <User | null> {
    await this.repoUser.update(id, updateUserDto);
    return this.repoUser.findOneBy( {id} );
  }

  async delete(id: number): Promise <void> {
    await this.repoUser.delete(id);
  }
}
