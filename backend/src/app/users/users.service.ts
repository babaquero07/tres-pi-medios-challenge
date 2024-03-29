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
          Sales: {
            select: {
              id: true,
              qty: true,
              sale_at: true,

              Products: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
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

  static async getAllUsers() {
    try {
      const users = await prisma.users.findMany({
        include: {
          Roles: {
            select: {
              name: true,
            },
          },
          Sales: {
            select: {
              id: true,
              qty: true,
              sale_at: true,

              Products: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      });

      return users;
    } catch (error) {
      console.log(error);

      throw new Error("Error getting all users");
    }
  }

  static async deleteUserById(userId: string) {
    try {
      const user = await prisma.users.delete({
        where: {
          id: userId,
        },
      });

      return user ?? null;
    } catch (error) {
      console.log(error);

      throw new Error(`Error deleting user by id ${userId}`);
    }
  }

  static async deleteAllUsers() {
    try {
      await prisma.users.deleteMany();
    } catch (error) {
      console.log(error);

      throw new Error("Error deleting all users");
    }
  }

  static async updateUserRole(userId: string, role: string) {
    try {
      const roleInfo = await prisma.roles.findFirst({
        where: {
          name: role,
        },
      });

      const updatedUser = await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          roles_id: roleInfo.id,
        },
        include: {
          Roles: {
            select: {
              name: true,
            },
          },
        },
      });

      return updatedUser;
    } catch (error) {
      console.log(error);

      throw new Error(`Error updating user roles by id ${userId}`);
    }
  }
}
