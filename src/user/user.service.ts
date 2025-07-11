import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async getUserMe(userId) {
        return await this.prisma.user.findUnique({
            where: {
                id: userId, 
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        }).then(user => {
            if (!user) {
                console.error('User not found with ID:', userId);
                throw new Error('User not found');
            }
            
            return user;
        }).catch(error => {
            console.error('Error fetching user:', error);
            throw new Error('Failed to fetch user');
        });
        
    }
}
