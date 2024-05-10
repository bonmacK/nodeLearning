import { User } from "../entities/users.entity";
import { Roles } from "../entities/roles.entity";

export const getAllRoles = async () => {
  const [roles, count] = await Roles.findAndCount({
    relations: ["users"],
  });
  return {
    roles,
    count,
  };
};

export const addRoleToUser = async (
  userId: number,
  roleId: number
): Promise<User> => {
  const user = await User.findOne({ where: { id: userId } });

  const role: Roles = await Roles.findOne({ where: { id: roleId } });

  if (!user || !role) {
    throw new Error("User or role not found");
  }

  user.role = role;

  await user.save();
  return user;
};
