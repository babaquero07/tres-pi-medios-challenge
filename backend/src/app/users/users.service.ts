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

  static async createUser(
    roles_id: string,
    name: string,
    last_name: string,
    document: string
  ) {
    try {
      const newUser = await prisma.users.create({
        data: {
          roles_id,
          name,
          last_name,
          document,
        },
      });

      return newUser;
    } catch (error) {
      console.log(error);

      throw new Error("Error creating user");
    }
  }
}
