import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

export class UsersService {
    private users: any[] = [
        { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com' },
        { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com' },
        { id: 4, name: 'Diana Prince', email: 'diana.prince@example.com' },
        { id: 5, name: 'Ethan Hunt', email: 'ethan.hunt@example.com' },
        { id: 6, name: 'Fiona Gallagher', email: 'fiona.gallagher@example.com' },
        { id: 7, name: 'George Martin', email: 'george.martin@example.com' },
        { id: 8, name: 'Hannah Lee', email: 'hannah.lee@example.com' },
        { id: 9, name: 'Ian Wright', email: 'ian.wright@example.com' },
        { id: 10, name: 'Julia Roberts', email: 'julia.roberts@example.com' }
    ];
    private id = 1;

    create(dto: CreateUserDto) {
        const user = {
            id: this.id++,
            ...dto
        };

        this.users.push(user);
        return user;
    }

    getAllUsers() {
        return this.users;
    }

    getSpecificUser(id: number) {
        return this.users.find(user => user.id === id);
    }

    delete(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        return {
            users: this.users,
            deleted: true
        }
    }

    update(id: number, dto: UpdateUserDto){
        const user = this.getSpecificUser(id);

        if(!user) return null;

        Object.assign(user, dto);
        return user;
    }
}