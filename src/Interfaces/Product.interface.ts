import { ICreateCategory } from "./Category.interface";

export interface ICreateProduct {
  name: string;
  description: string;
  price: string;
  category: ICreateCategory;
  image: string;
}
