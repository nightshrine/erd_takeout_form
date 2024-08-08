import { PrismaClient } from "@prisma/client";
import { ICustomer } from "../definitions/transaction/customer-type";
import { IOrder } from "../definitions/transaction/order-type";
import { ITransactionResponse } from "../definitions/transaction-response-type";
const prisma = new PrismaClient();

const getCustomer = async (): Promise<ICustomer[]> => {
  const customer = await prisma.customer.findMany();
  return customer;
};

const getOrder = async (): Promise<IOrder[]> => {
  const order = await prisma.order.findMany();
  return order;
};

export const getTransaction = async (): Promise<ITransactionResponse> => {
  const customer = await getCustomer();
  const order = await getOrder();

  return {
    customer,
    order,
  };
};
