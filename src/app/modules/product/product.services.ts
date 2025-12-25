import { db } from "../../../db/connection";

export const ProductService = {
  createProductIntoDB: async (data: any) => {
    const { title, price, quantity, rating, is_trending, brand_id, image, description, SKU, tag, type, topRated, badge } = data;

    const [result] = await db.query(
      `INSERT INTO products 
   (title, price, quantity, rating, is_trending, brand_id, image, description, SKU, tag, type, topRated, badge)
   VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        title,
        price,
        quantity,
        rating || 0,
        is_trending || false,
        brand_id,
        image || null,
        description || null,
        SKU || null,
        JSON.stringify(tag || []),
        type || null,
        topRated || false,
        badge || null
      ]
    );

    return { id: (result as any).insertId, ...data };
  },

  getAllProductsFromDB: async () => {
    const [rows] = await db.query("SELECT * FROM products");
    return (rows as any[]).map(row => ({
      ...row,
      tag: Array.isArray(row.tag)
        ? row.tag // already array
        : typeof row.tag === "string"
          ? row.tag.split(',') // comma-separated string
          : [] // null/undefined/other type
    }));
  },

  getSingleProductFromDB: async (id: string) => {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    const product = (rows as any[])[0];

    if (product) {
      if (Array.isArray(product.tag)) {
        // already array
        product.tag = product.tag;
      } else if (typeof product.tag === "string") {
        try {
          // If the format is JSON
          product.tag = JSON.parse(product.tag);
        } catch {
          // If not JSON, handle as comma-separated string
          product.tag = product.tag.split(',');
        }
      } else {
        // null or other type
        product.tag = [];
      }
    }

    return product;
  },
  
  updateProductIntoDB: async (id: string, data: any) => {
    const fields = [];
    const values = [];

    for (const key in data) {
      if (key === "tag") {
        fields.push(`${key} = ?`);
        values.push(JSON.stringify(data[key]));
      } else {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
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
