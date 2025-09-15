export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string; // ممكن تخليها Date لو هتتعامل مع تواريخ
  updatedAt: string; // نفس الكلام
}
