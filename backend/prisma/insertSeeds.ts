import { PrismaClient } from "@prisma/client";
import { customerSeeds } from "./seed/CustomerSeeds";
import { orderSeeds } from "./seed/OrderSeeds";
import { productSeeds } from "./seed/ProductSeeds";
import { productCategorySeeds } from "./seed/ProductCategorySeeds";
const prisma = new PrismaClient();

const getCustomerSeedsTransaction = () => {
  return customerSeeds.map((customerSeed) => {
    return prisma.customer.create({
      data: customerSeed,
    });
  });
};

const getOrdersSeedsTransaction = () => {
  return orderSeeds.map((orderSeed) => {
    return prisma.order.create({
      data: orderSeed,
    });
  });
};

const getProductSeedsTransaction = () => {
  return productSeeds.map((productSeed) => {
    return prisma.product.create({
      data: productSeed,
    });
  });
};

const getProductCategorySeedsTransaction = () => {
  return productCategorySeeds.map((productCategorySeed) => {
    return prisma.productCategory.create({
      data: productCategorySeed,
    });
  });
};

// トランザクション処理で行うデータ登録処理を作成
const transfer = async () => {
  const transaction = [];
  // それぞれのシードデータをトランザクションに追加
  // 外部キー制約のため、順番を考慮する必要あり
  transaction.push(...getCustomerSeedsTransaction());
  transaction.push(...getProductCategorySeedsTransaction());
  transaction.push(...getProductSeedsTransaction());
  transaction.push(...getOrdersSeedsTransaction());

  // トランザクションを実行
  await prisma.$transaction(transaction);
};

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`);

  await transfer();

  console.log(`Seeding finished.`);
};

// 処理開始
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
