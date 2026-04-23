import {MongooseModule} from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { ProductsModule } from "./modules/products/products.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { RatingsModule } from "./modules/ratings/ratings.module";

@Module({
    imports: [
        UsersModule,
        ProductsModule,
        OrdersModule,
        RatingsModule,
        MongooseModule.forRoot('mongodb+srv://threeunexpectedperson_db_user:KoVwMOXuYeKZxqNa@nextdrive-cluster.4pppm22.mongodb.net/?appName=nextdrive-cluster')
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
