import { PrismaClient } from "@prisma/client";
import { customerSeeds } from "./seed/CustomerSeeds";
import { orderSeeds } from "./seed/OrderSeeds";
import { productSeeds } from "./seed/ProductSeeds";
import { productCategorySeeds } from "./seed/ProductCategorySeeds";
import { execSync } from "child_process";
const prisma = new PrismaClient();

async function insertCustomerSeeds() {
  const promises = customerSeeds.map(async (customer) => {
    try {
      execSync(
        `wrangler d1 execute erd_takeout_form_db --command "INSERT INTO  \"Customer\" (\"name\", \"phoneNumber\") VALUES  ('${customer.name}', '${customer.phoneNumber}');" --remote`
      );
    } catch (error) {
      console.error(error);
    }
  });
  await Promise.all(promises);
}

async function insertOrderSeeds() {
  const promises = orderSeeds.map(async (order) => {
    try {
      execSync(
        `wrangler d1 execute erd_takeout_form_db --command "INSERT INTO  \"Order\" (\"quantity\", \"customerId\", \"productId\") VALUES  (${order.quantity}, ${order.customerId}, ${order.productId});" --remote`
      );
    } catch (error) {
      console.error(error);
    }
  });
  await Promise.all(promises);
}

async function insertProductSeeds() {
  const promises = productSeeds.map(async (product) => {
    try {
      execSync(
        `wrangler d1 execute erd_takeout_form_db --command "INSERT INTO  \"Product\" (\"name\", \"price\", \"priceWithTax\", \"classification\", \"categoryId\") VALUES  ('${product.name}', ${product.price}, ${product.priceWithTax}, '${product.classification}', ${product.categoryId});" --remote`
      );
    } catch (error) {
      console.error(error);
    }
  });
  await Promise.all(promises);
}

async function insertProductCategorySeeds() {
  const promises = productCategorySeeds.map(async (productCategory) => {
    try {
      execSync(
        `wrangler d1 execute erd_takeout_form_db --command "INSERT INTO  \"ProductCategory\" (\"name\") VALUES  ('${productCategory.name}');" --remote`
      );
    } catch (error) {
      console.error(error);
    }
  });
  await Promise.all(promises);
}

// トランザクション処理で行うデータ登録処理を作成
const transfer = async () => {
  await insertProductCategorySeeds();
  await insertProductSeeds();
  await insertCustomerSeeds();
  await insertOrderSeeds();
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
