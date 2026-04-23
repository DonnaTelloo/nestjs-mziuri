export class CreateRatingDto {
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
}