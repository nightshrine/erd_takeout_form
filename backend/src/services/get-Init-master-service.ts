import { PrismaClient } from "@prisma/client";
import { IProduct } from "../definitions/master/product-type";
import { IProductCategory } from "../definitions/master/product-category-type";
import { IMasterResponse } from "../definitions/master-response-type";
import { Bindings } from "../definitions/db/d1";
import db from "../middleware/db";

class GetInitMasterService {
  private prisma: PrismaClient;

  public constructor(env: Bindings) {
    this.prisma = db(env);
  }

  private async getProduct(): Promise<IProduct[]> {
    const product = await this.prisma.product.findMany();
    return product;
  }

  private async getProductCategory(): Promise<IProductCategory[]> {
    const productCategory = await this.prisma.productCategory.findMany();
    return productCategory;
  }

  public async getInitMaster(): Promise<IMasterResponse> {
    const product = await this.getProduct();
    const productCategory = await this.getProductCategory();

    return {
      product,
      productCategory,
    };
  }
}

export default GetInitMasterService;
