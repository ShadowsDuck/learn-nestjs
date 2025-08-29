import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe1',
      email: 'john1.doe@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'John Doe2',
      email: 'john2.doe@example.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'John Doe3',
      email: 'john3.doe@example.com',
      role: 'user',
    },
    {
      id: 4,
      name: 'John Doe4',
      email: 'john4.doe@example.com',
      role: 'user',
    },
    {
      id: 5,
      name: 'John Doe5',
      email: 'john5.doe@example.com',
      role: 'user',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(role?: 'admin' | 'user') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }

      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  remove(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
