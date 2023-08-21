import Koa, { Context, Next } from "koa";
import Router from "koa-router";
import session from "koa-session";
import bodyParser from "koa-bodyparser";
const cors = require("koa2-cors"); // Import the cors middleware
const jwt = require("jsonwebtoken");
import {
  getAllUsers,
  insertUpdate,
  insertUser,
  searchUserByMail,
} from "./db/queries";
import { comparePasswords, hashPassword } from "./utils";

const app = new Koa();
app.use(cors());
const router = new Router();

// Use koa-bodyparser middleware
app.use(bodyParser());

// Use koa-session middleware
app.keys = ["your-secret-key"];
app.use(session(app));

// Middleware to check if the user is logged in
async function requireLogin(ctx: Context, next: Next) {
  if (!ctx.session?.user) {
    return ctx.redirect("/login");
  }
  await next();
}

router.get("/", requireLogin, (ctx: Context) => {
  const username = ctx.session?.user?.username || "Guest";
  ctx.body = `Welcome, ${username}!`;
});


router.post("/login", async (ctx: any) => {
  const { email, password } = ctx.request.body;

  if (!email || !password) throw new Error("Bad request");

  const user: any = await searchUserByMail(email);

  if (user && (await comparePasswords(password, user.password))) {
    const token = jwt.sign({ userId: user?.email }, "your-secret-key", {
      expiresIn: "1h", // Set token expiration time
    });
    ctx.body = { token };
    ctx.session.user = user;
    ctx.status = 200; // Set the response status to 200
  } else {
    ctx.body = "Invalid login credentials.";
    ctx.status = 400;
  }
});

router.get("/users", async (ctx) => {
  try {
    const users = await getAllUsers();
    ctx.body = users;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Database error" };
  }
});

router.post("/updates", async (ctx: any) => {
  try {
    const { userId, content } = ctx.request.body; // Assuming you're sending userId and content in the request body

    const insertedId = await insertUpdate(userId, content);
    ctx.status = 201;
    ctx.body = { message: "Update inserted", insertedId };
  } catch (error) {
    console.error("Error inserting update:", error);
    ctx.status = 500;
    ctx.body = { error: "Failed to insert update" };
  }
});

router.post("/user", async (ctx: any) => {
  try {
    const { name, email, password } = ctx.request.body;
    if (!name || !email || !password) throw new Error("Bad Request");

    const hashedPassword = await hashPassword(password);
    const user = { name: name, email: email, password: hashedPassword };
    const userId = await insertUser(user);
    ctx.status = 201;
    ctx.body = { message: "User inserted", userId };
  } catch (error: any) {
    console.error("Error inserting user", error);
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

app.use(router.routes());

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
