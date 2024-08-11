import { PrismaClient } from "@prisma/client";
import { Bindings } from "../definitions/db/d1";
import { IOrderRequest } from "../definitions/order-request-type";
import db from "../middleware/db";

class PostOrderService {
  private prisma: PrismaClient;

  public constructor(env: Bindings) {
    this.prisma = db(env);
  }

  private async insertUser(
    customerName: string,
    customerPhoneNumber: string
  ): Promise<void> {
    await this.prisma.customer.create({
      data: {
        name: customerName,
        phoneNumber: customerPhoneNumber,
      },
    });
  }

  private async searchUser(
    customerName: string,
    customerPhoneNumber: string
  ): Promise<number | null> {
    const user = await this.prisma.customer.findFirst({
      where: {
        name: customerName,
        phoneNumber: customerPhoneNumber,
      },
    });
    if (user === null) {
      return null;
    }
    return user.id;
  }

  private async getUserId(
    customerName: string,
    customerPhoneNumber: string
  ): Promise<number> {
    const userId = await this.searchUser(customerName, customerPhoneNumber);
    if (userId === null) {
      await this.insertUser(customerName, customerPhoneNumber);
      const userId = await this.searchUser(customerName, customerPhoneNumber);
      if (userId === null) {
        throw new Error("ユーザーの登録に失敗しました");
      }
      return userId;
    }
    return userId;
  }

  public async postOrder(IOrderRequest: IOrderRequest): Promise<void> {
    const userId = await this.getUserId(
      IOrderRequest.customerName,
      IOrderRequest.customerPhoneNumber
    );
    const orderDict = IOrderRequest.orderDict;
    for (const productId in orderDict) {
      await this.prisma.order.create({
        data: {
          customerId: userId,
          productId: Number(productId),
          quantity: orderDict[productId],
        },
      });
    }
    return;
  }
}

export default PostOrderService;
