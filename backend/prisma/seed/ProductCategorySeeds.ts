import { Prisma } from "@prisma/client";

export const productCategorySeeds: Prisma.ProductCategoryCreateManyInput[] = [
  {
    name: "お持ち帰り弁当",
  },
  {
    name: "お持ち帰り専用プレート",
  },
  {
    name: "点心・前菜",
  },
  {
    name: "一品料理",
  },
  {
    name: "飯・麺",
  },
]