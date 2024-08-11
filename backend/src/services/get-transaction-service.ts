import { PrismaClient } from "@prisma/client";
import { ICustomer } from "../definitions/transaction/customer-type";
import { IOrder } from "../definitions/transaction/order-type";
import { ITransactionResponse } from "../definitions/transaction-response-type";
import { Bindings } from "../definitions/db/d1";
import db from "../middleware/db";

class GetTransactionService {
  private prisma: PrismaClient;

  public constructor(env: Bindings) {
    this.prisma = db(env);
  }

  private async getCustomer(): Promise<ICustomer[]> {
    const customer = await this.prisma.customer.findMany();
    return customer;
  }

  private async getOrder(): Promise<IOrder[]> {
    const order = await this.prisma.order.findMany();
    return order;
  }

  public async getTransaction(): Promise<ITransactionResponse> {
    const customer = await this.getCustomer();
    const order = await this.getOrder();

    return {
      customer,
      order,
    };
  }
}

export default GetTransactionService;
