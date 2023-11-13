import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import Joi from '@hapi/joi';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
    AuthModule,
    CartModule,
    OrderModule,
    DatabaseModule
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})

export class AppModule {}
