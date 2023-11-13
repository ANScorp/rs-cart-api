import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { Order } from '../database/entities/order.entity';
import { OrderController } from './order.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([Order]), DatabaseModule ],
  providers: [ OrderService ],
  controllers: [ OrderController ]
})
export class OrderModule {}
