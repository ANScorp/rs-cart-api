import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './services';

@ApiTags('Order')
@Controller('api/profile/order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Get()
  async getAllOrders() {
    const orders = await this.orderService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { orders },
    }
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    const order = await this.orderService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    }
  }
}
