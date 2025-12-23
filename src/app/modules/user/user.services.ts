import { db } from "../../../db/connection";
import jwt from 'jsonwebtoken';
import bcrypt  from 'bcrypt';

const SALT_ROUNDS = 10;

export const UserService = {
  CreateUserIntoDB: async (userData: any) => {
    const { name, email, password, role } = userData;

    // check if email exists
    const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if ((rows as any[]).length) throw new Error("Email already exists");

    // hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const [result] = await db.query(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      [name, email, hashedPassword, role || "customer"]
    );

    return { id: (result as any).insertId, name, email, role: role || "customer" };
  },

  LoginFromDB: async (loginData: any) => {
    const { email, password } = loginData;
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = (rows as any[])[0];
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return { id: user.id, name: user.name, email: user.email, role: user.role, token };
  },

  getUserInfoFromDB: async (query: any) => {
    const { token } = query;
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const [rows] = await db.query("SELECT id,name,email,role FROM users WHERE id = ?", [
      decoded.id,
    ]);
    return (rows as any[])[0];
  },

  updateuserIntoDB: async (id: string, data: any) => {
    const fields = [];
    const values: any[] = [];

    for (const key in data) {
      if (key === "password") {
        const hashed = await bcrypt.hash(data[key], SALT_ROUNDS);
        fields.push(`${key} = ?`);
        values.push(hashed);
      } else {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    values.push(id);
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    await db.query(sql, values);
    return { id, ...data };
  },

  updateuserPictureIntoDB: async (id: string, image: string) => {
    await db.query("UPDATE users SET image = ? WHERE id = ?", [image, id]);
    return { id, image };
  },

  deleteUserFromDB: async (id: string) => {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return { id };
  },

  getAllUserFormDB: async (query: any) => {
    const [rows] = await db.query("SELECT id,name,email,role FROM users");
    return rows;
  },
};
