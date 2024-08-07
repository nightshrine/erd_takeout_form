import { PrismaClient } from "@prisma/client";
import { IProduct } from "../../prisma/definitions/master/IProduct";
import { IProductCategory } from "../../prisma/definitions/master/IProductCategory";
import { IMasterResponse } from "../../prisma/definitions/IMasterResponse";
const prisma = new PrismaClient();

const getProduct = async (): Promise<IProduct[]> => {
  const product = await prisma.product.findMany();
  return product;
};

const getProductCategory = async (): Promise<IProductCategory[]> => {
  const productCategory = await prisma.productCategory.findMany();
  return productCategory;
};

export const getInitMaster = async (): Promise<IMasterResponse> => {
  const product = await getProduct();
  const productCategory = await getProductCategory();

  return {
    product,
    productCategory,
  };
};
