import prisma from "../../lib/prisma";

export class UsersService {
  static async getUserById(userId: string) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
        include: {
          Roles: {
            select: {
              name: true,
            },
          },
        },
      });

      return user;
    } catch (error) {
      console.log(error);

      throw new Error(`Error getting user by id ${userId}`);
    }
  }
}
