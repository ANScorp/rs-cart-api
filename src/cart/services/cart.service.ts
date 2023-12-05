import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../database/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async findAll() {
    try {
      const carts = await this.cartRepository.find();
      return carts;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findOne(id: string) {
    try {
      const cart = await this.cartRepository.findOneBy({ id });
      return cart;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
