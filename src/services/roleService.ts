import { Role } from "../entities/roles.entity";

export const getAllRoles = async () => {
  const [roles, count] = await Role.findAndCount({
    relations: ["users"],
  });
  return {
    roles,
    count,
  };
};
