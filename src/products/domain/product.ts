import { ProductInterface } from "./product.interface";

export class Product implements ProductInterface {

  private id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(name: string, description: string, price: number, stock: number) {
    this.id = Date.now();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }
}
