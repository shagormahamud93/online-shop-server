import { db } from "../../../db/connection";

export const CategoryService = {
  createCategoryIntoDB: async (data: any) => {
    const { name, parent_id } = data;

    const [result] = await db.query(
      "INSERT INTO categories (name, parent_id) VALUES (?,?)",
      [name, parent_id || null]
    );

    return { id: (result as any).insertId, name, parent_id };
  },

  getAllCategoriesFromDB: async () => {
    const [rows] = await db.query("SELECT * FROM categories");
    return rows;
  },

  getSingleCategoryFromDB: async (id: string) => {
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
    return (rows as any[])[0];
  },

  updateCategoryIntoDB: async (id: string, data: any) => {
    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    values.push(id);
    const sql = `UPDATE categories SET ${fields.join(", ")} WHERE id = ?`;
    await db.query(sql, values);

    return { id, ...data };
  },

  deleteCategoryFromDB: async (id: string) => {
    await db.query("DELETE FROM categories WHERE id = ?", [id]);
    return { id };
  },
};
