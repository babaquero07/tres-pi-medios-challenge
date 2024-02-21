import prisma from "../../lib/prisma";

export class RolesService {
  static async createRole(name: string) {
    try {
      const newRole = await prisma.roles.create({
        data: {
          name,
        },
      });

      return newRole;
    } catch (error) {
      console.log(error);

      throw new Error(`Error creating role with the name: ${name}`);
    }
  }
}
