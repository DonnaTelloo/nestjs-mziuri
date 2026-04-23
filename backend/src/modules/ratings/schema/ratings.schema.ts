import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Rating {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    comment?: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);