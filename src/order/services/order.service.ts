import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../database/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>
  ) {}

  async findAll() {
    try {
      const orders = await this.ordersRepository.find();
      return orders;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.ordersRepository.findOneBy({ id });
      return order;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
