import { Product } from "../types/product";

class Cart {
  private items: Product[] = [];

  addItem(item: Product) {
    this.items.push(item);
    console.log(`${item.title} added to cart`);
  }

  removeItem(item: Product) {
    this.items = this.items.filter((i) => i.id !== item.id);
    console.log(`${item.title} removed from cart`);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    console.log("Cart cleared");
  }
}

export default Cart;
