import { db } from "../../../db/connection";

export const ProductService = {
  createProductIntoDB: async (data: any) => {
    const { title, price, quantity, rating, is_trending, brand_id } = data;

    const [result] = await db.query(
      `INSERT INTO products 
      (title, price, quantity, rating, is_trending, brand_id)
      VALUES (?,?,?,?,?,?)`,
      [title, price, quantity, rating || 0, is_trending || false, brand_id]
    );

    return { id: (result as any).insertId, ...data };
  },

  getAllProductsFromDB: async () => {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  },

  getSingleProductFromDB: async (id: string) => {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    return (rows as any[])[0];
  },

  updateProductIntoDB: async (id: string, data: any) => {
    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
    values.push(id);

    const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
    await db.query(sql, values);

    return { id, ...data };
  },

  deleteProductFromDB: async (id: string) => {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    return { id };
  },
};
