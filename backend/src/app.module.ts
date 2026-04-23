import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import {RatingsModule} from "./modules/ratings/ratings.module";

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    OrdersModule,
    RatingsModule,
    MongooseModule.forRoot(
      'mongodb+srv://threeunexpectedperson_db_user:s5yc8pQVDgIbTaqr@nestjs-mziuri.ntasucc.mongodb.net/?appName=nestjs-mziuri',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}