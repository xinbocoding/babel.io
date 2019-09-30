import { Injectable } from '@nestjs/common';

export type User = {
    userId: string
    username: string
}

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: '1',
                username: 'join'
            }
        ]
    }

    async findByAuthId(authId: string): Promise<User | undefined> {
        return null;
    }
}
