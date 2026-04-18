import { CreateOrderDto, OrderStatus } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

export class OrdersService {
    private orders: any[] = [
        { 
            id: 1, 
            userId: 1, 
            items: [
                { productId: 1, quantity: 1 },
                { productId: 3, quantity: 2 }
            ],
            status: OrderStatus.DELIVERED,
            totalAmount: 1025.97,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-20')
        },
        { 
            id: 2, 
            userId: 2, 
            items: [
                { productId: 2, quantity: 1 }
            ],
            status: OrderStatus.SHIPPED,
            totalAmount: 699.99,
            createdAt: new Date('2024-01-18'),
            updatedAt: new Date('2024-01-19')
        },
        { 
            id: 3, 
            userId: 3, 
            items: [
                { productId: 4, quantity: 1 },
                { productId: 7, quantity: 3 }
            ],
            status: OrderStatus.PROCESSING,
            totalAmount: 149.96,
            createdAt: new Date('2024-01-20'),
            updatedAt: new Date('2024-01-20')
        },
        { 
            id: 4, 
            userId: 1, 
            items: [
                { productId: 6, quantity: 1 },
                { productId: 8, quantity: 1 }
            ],
            status: OrderStatus.PENDING,
            totalAmount: 224.98,
            createdAt: new Date('2024-01-21'),
            updatedAt: new Date('2024-01-21')
        },
        { 
            id: 5, 
            userId: 4, 
            items: [
                { productId: 5, quantity: 2 },
                { productId: 9, quantity: 1 }
            ],
            status: OrderStatus.CANCELLED,
            totalAmount: 99.97,
            createdAt: new Date('2024-01-19'),
            updatedAt: new Date('2024-01-19')
        }
    ];
    private id = 6;

    create(dto: CreateOrderDto) {
        const order = {
            id: this.id++,
            ...dto,
            totalAmount: this.calculateTotalAmount(dto.items),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.orders.push(order);
        return order;
    }

    getAllOrders() {
        return this.orders;
    }

    getSpecificOrder(id: number) {
        return this.orders.find(order => order.id === id);
    }

    getOrdersByUser(userId: number) {
        return this.orders.filter(order => order.userId === userId);
    }

    getOrdersByStatus(status: OrderStatus) {
        return this.orders.filter(order => order.status === status);
    }

    delete(id: number) {
        this.orders = this.orders.filter(order => order.id !== id);
        return {
            orders: this.orders,
            deleted: true
        }
    }

    update(id: number, dto: UpdateOrderDto){
        const order = this.getSpecificOrder(id);

        if(!order) return null;

        Object.assign(order, { ...dto, updatedAt: new Date() });
        return order;
    }

    private calculateTotalAmount(items: any[]): number {
        // Mock calculation - in real app, you'd fetch product prices
        const mockPrices = { 1: 999.99, 2: 699.99, 3: 12.99, 4: 89.99, 5: 29.99, 6: 199.99, 7: 19.99, 8: 24.99, 9: 39.99, 10: 59.99 };
        return items.reduce((total, item) => {
            const price = mockPrices[item.productId] || 0;
            return total + (price * item.quantity);
        }, 0);
    }
}