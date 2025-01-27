import { prisma } from './baseDbService';

export const getUsers = () => {
  return prisma.user.findMany();
};

/**
 * Getting the list of user's related permissions
 * @param email : user email
 * @returns the list of user permissions
 */
export const getUserPermissions = async (email: string): Promise<string[]> => {
  const result = await prisma.user.findFirst({
    where: { email },
    include: {
      profile: {
        include: {
          profile_permission: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });
  // if the user with the given email is not found
  if (!result) throw new Error('USER NOT FOUND', { cause: 404 });
  // if the user with the given email is found
  else {
    // checking profile existing permissions
    const profile_permissions = result?.profile?.profile_permission;
    // if permissions are found, extract only permisions names
    // Example => ["ROLE_ADMIN", "ROLE_USERS_R"]
    if (profile_permissions) {
      return profile_permissions
        .map((pp) => pp.permission?.name)
        // filtering null values in case "name" is null
        .filter((name): name is string => name !== null);
    }
    return [];
  }
};
