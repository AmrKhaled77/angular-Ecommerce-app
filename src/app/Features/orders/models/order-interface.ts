// user info inside the order
export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// subcategory of a product
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// product category
export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// product brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// product details
export interface Product {
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: ProductCategory;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

// cart item inside the order
export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

// final order response
export interface IOrder {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: 'cash' | 'visa';
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderUser;
  cartItems: CartItem[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: number;
  __v: number;
}
