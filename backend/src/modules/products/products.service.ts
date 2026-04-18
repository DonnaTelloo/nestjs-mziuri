import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

export class ProductsService {
    private products: any[] = [
        { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 999.99, stock: 50, category: 'Electronics' },
        { id: 2, name: 'Smartphone', description: 'Latest smartphone model', price: 699.99, stock: 100, category: 'Electronics' },
        { id: 3, name: 'Coffee Mug', description: 'Ceramic coffee mug', price: 12.99, stock: 200, category: 'Home & Kitchen' },
        { id: 4, name: 'Running Shoes', description: 'Comfortable running shoes', price: 89.99, stock: 75, category: 'Sports' },
        { id: 5, name: 'Book', description: 'Programming guide book', price: 29.99, stock: 30, category: 'Books' },
        { id: 6, name: 'Headphones', description: 'Wireless noise-canceling headphones', price: 199.99, stock: 40, category: 'Electronics' },
        { id: 7, name: 'T-Shirt', description: 'Cotton t-shirt', price: 19.99, stock: 150, category: 'Clothing' },
        { id: 8, name: 'Water Bottle', description: 'Stainless steel water bottle', price: 24.99, stock: 80, category: 'Sports' },
        { id: 9, name: 'Desk Lamp', description: 'LED desk lamp', price: 39.99, stock: 60, category: 'Home & Kitchen' },
        { id: 10, name: 'Backpack', description: 'Travel backpack', price: 59.99, stock: 45, category: 'Travel' }
    ];
    private id = 11;

    create(dto: CreateProductDto) {
        const product = {
            id: this.id++,
            ...dto
        };

        this.products.push(product);
        return product;
    }

    getAllProducts() {
        return this.products;
    }

    getSpecificProduct(id: number) {
        return this.products.find(product => product.id === id);
    }

    delete(id: number) {
        this.products = this.products.filter(product => product.id !== id);
        return {
            products: this.products,
            deleted: true
        }
    }

    update(id: number, dto: UpdateProductDto){
        const product = this.getSpecificProduct(id);

        if(!product) return null;

        Object.assign(product, dto);
        return product;
    }

    getProductsByCategory(category: string) {
        return this.products.filter(product => product.category === category);
    }
}