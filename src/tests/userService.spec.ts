import { addProduct, getAllUsers, updateUser } from "../services/userService";
import { User } from "../entities/users.entity";
import bcrypt from "bcrypt";
import { UpdateUserDto } from "../dto/user.dto";
import { Product } from "../entities/products.entity";

jest.mock("../entities/users.entity", () => ({
  User: {
    findAndCount: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

jest.mock("../entities/products.entity", () => ({
  Product: {
    findOne: jest.fn(),
  },
}));

describe("Verify getAllUsers function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return users and count", async () => {
    const mockUsers = [{ id: 1, name: "User 1", email: "user1@example.com" }];
    const mockCount = 1;

    (User.findAndCount as jest.Mock).mockResolvedValueOnce([
      mockUsers,
      mockCount,
    ]);

    const result = await getAllUsers();
    expect(result).toEqual({ users: mockUsers, count: mockCount });

    expect(User.findAndCount).toHaveBeenCalledWith({
      relations: ["products"],
    });
  });

  it("should handle errors", async () => {
    const errorMessage = "Database error";

    (User.findAndCount as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );
    await expect(getAllUsers()).rejects.toThrow(errorMessage);
  });
});

describe(" Verify updateUser function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update user with provided fields", async () => {
    const userId = 1;
    const userDto = {
      name: "New Name",
      email: "new@example.com",
      password: "newpassword",
    };
    const hashedPassword = "hashedPassword";

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);

    (User.update as jest.Mock).mockResolvedValueOnce({ affected: 1 });

    const updatedUser = { id: userId, ...userDto };
    (User.findOne as jest.Mock).mockResolvedValueOnce(updatedUser);

    const result = await updateUser(userId, userDto);

    expect(bcrypt.hash).toHaveBeenCalledWith(userDto.password, 10);

    expect(User.update).toHaveBeenCalledWith(
      { id: userId },
      {
        email: userDto.email,
        name: userDto.name,
        password: hashedPassword,
      }
    );

    expect(User.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    expect(result).toEqual(updatedUser);
  });

  it("should throw error if user is not updated", async () => {
    const userId = 1;
    const userDto = {
      name: "New Name",
      email: "new@example.com",
      password: "newpassword",
    };

    (User.update as jest.Mock).mockResolvedValueOnce({ affected: 0 });

    await expect(updateUser(userId, userDto)).rejects.toThrowError(
      "User hasn't been updated"
    );
  });
});

describe("updateUser function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update user with provided fields", async () => {
    const userId = 1;
    const userDto: UpdateUserDto = {
      name: "New Name",
      email: "new@example.com",
      password: "newpassword",
    };
    const hashedPassword = "hashedPassword";

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);
    (User.update as jest.Mock).mockResolvedValueOnce({ affected: 1 });

    const expectedUser = { id: userId, ...userDto };

    (User.findOne as jest.Mock).mockResolvedValueOnce(expectedUser);

    const result = await updateUser(userId, userDto);
    expect(bcrypt.hash).toHaveBeenCalledWith(userDto.password, 10);

    expect(User.update).toHaveBeenCalledWith(
      { id: userId },
      {
        email: userDto.email,
        name: userDto.name,
        password: hashedPassword,
      }
    );

    expect(User.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    expect(result).toEqual(expectedUser);
  });

  it("should throw error if user is not updated", async () => {
    const userId = 1;
    const userDto: UpdateUserDto = {
      name: "New Name",
      email: "new@example.com",
      password: "newpassword",
    };
    (User.update as jest.Mock).mockResolvedValueOnce({ affected: 0 });
    await expect(updateUser(userId, userDto)).rejects.toThrowError(
      "User hasn't been updated"
    );
  });
});

describe("Verify addProduct function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add product to user", async () => {
    const userId = 1;
    const productId = 1;

    const mockProduct = { id: productId };
    (Product.findOne as jest.Mock).mockResolvedValueOnce(mockProduct);

    const mockUser = { id: userId, products: [], save: jest.fn() };
    (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await addProduct(userId, productId);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { id: userId },
      relations: ["products"],
    });
    expect(Product.findOne).toHaveBeenCalledWith({ where: { id: productId } });
    expect(mockUser.save).toHaveBeenCalled();
    expect(mockUser.products).toContainEqual(mockProduct);
    expect(result).toEqual(mockUser);
  });

  it("should throw error if user or product not found", async () => {
    const userId = 1;
    const productId = 1;

    (User.findOne as jest.Mock).mockResolvedValueOnce(undefined);
    (Product.findOne as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(addProduct(userId, productId)).rejects.toThrowError(
      "User or product not found"
    );
  });

  it("should return undefined if product already exists in user", async () => {
    const userId = 1;
    const productId = 1;

    const mockUser = { id: userId, products: [{ id: productId }] };
    (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

    const mockProduct = { id: productId };
    (Product.findOne as jest.Mock).mockResolvedValueOnce(mockProduct);

    const result = await addProduct(userId, productId);
    expect(result).toBeUndefined();
  });
});
