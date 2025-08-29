import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import type { DrizzleDB } from 'src/drizzle/types/drizzle';
import { eq } from 'drizzle-orm';
import { employees } from 'src/drizzle/schema/employees.schema';
import { RoleEnum } from './dto/query-role.dto';

@Injectable()
export class EmployeesService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const exists = await this.db.query.employees.findFirst({
      where: eq(employees.email, createEmployeeDto.email),
    });

    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    return await this.db
      .insert(employees)
      .values(createEmployeeDto)
      .returning();
  }

  async findAll(role?: RoleEnum) {
    const where = role ? eq(employees.role, role) : undefined;

    const employeesArray = await this.db.query.employees.findMany({
      where,
    });

    if (employeesArray.length === 0) {
      throw new NotFoundException(
        role ? 'User Role Not Found' : "Employee's Not Found",
      );
    }

    return employeesArray;
  }

  async findOne(id: number) {
    const employee = await this.db.query.employees.findFirst({
      where: eq(employees.id, id),
    });

    if (!employee) {
      throw new NotFoundException('User Not Found');
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    // ถ้าไม่เจอจะโยน NotFoundException ออกมาเอง
    await this.findOne(id);

    const [updatedEmployee] = await this.db
      .update(employees)
      .set({ ...updateEmployeeDto, updatedAt: new Date() })
      .where(eq(employees.id, id))
      .returning();

    return updatedEmployee;
  }

  async remove(id: number) {
    await this.findOne(id);

    const [deletedEmployee] = await this.db
      .delete(employees)
      .where(eq(employees.id, id))
      .returning();

    return deletedEmployee;
  }
}
