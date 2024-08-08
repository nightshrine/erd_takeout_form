import { IOrderRequest } from "../definitions/order-request-type";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const insertUser = async (
  customerName: string,
  customerPhoneNumber: string
): Promise<void> => {
  await prisma.customer.create({
    data: {
      name: customerName,
      phoneNumber: customerPhoneNumber,
    },
  });
};

const searchUser = async (
  customerName: string,
  customerPhoneNumber: string
): Promise<number | null> => {
  const user = await prisma.customer.findFirst({
    where: {
      name: customerName,
      phoneNumber: customerPhoneNumber,
    },
  });
  if (user === null) {
    return null;
  }
  return user.id;
};

const getUserId = async (
  customerName: string,
  customerPhoneNumber: string
): Promise<number> => {
  const userId = await searchUser(customerName, customerPhoneNumber);
  if (userId === null) {
    await insertUser(customerName, customerPhoneNumber);
    const userId = await searchUser(customerName, customerPhoneNumber);
    if (userId === null) {
      throw new Error("ユーザーの登録に失敗しました");
    }
    return userId;
  }
  return userId;
};

export const postOrderService = async (
  IOrderRequest: IOrderRequest
): Promise<void> => {
  const userId = await getUserId(
    IOrderRequest.customerName,
    IOrderRequest.customerPhoneNumber
  );
  const orderDict = IOrderRequest.orderDict;
  for (const productId in orderDict) {
    await prisma.order.create({
      data: {
        customerId: userId,
        productId: Number(productId),
        quantity: orderDict[productId],
      },
    });
  }
  return;
};
