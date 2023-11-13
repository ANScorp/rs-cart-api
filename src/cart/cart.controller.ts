import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { CartService } from './services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
  ) { }

  @Get()
  async getAllCarts() {
    const carts = await this.cartService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { carts },
    }
  }

  @Get(':id')
  async getCartById(@Param('id') id: string) {
    const cart = await this.cartService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    }
  }
}
