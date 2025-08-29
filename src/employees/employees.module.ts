import { Module, ValidationPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [DrizzleModule],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class EmployeesModule {}
