import Koa, { Context, Next } from "koa";
import Router from "koa-router";
import session from "koa-session";
import bodyParser from "koa-bodyparser";
import bcrypt from "bcrypt";
const cors = require("koa2-cors"); // Import the cors middleware
const jwt = require("jsonwebtoken");
import { getAllUsers,insertUpdate } from "./db/queries";


const app = new Koa();
app.use(cors());
const router = new Router();

// Use koa-bodyparser middleware
app.use(bodyParser());

// Use koa-session middleware
app.keys = ["your-secret-key"];
app.use(session(app));

// Sample in-memory user database (replace this with a real database)
const users = [
  { id: 1, email: "abhash.kumar@zopsmart.com", password: "password" }, // Password: password1
];

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

router.get("/login", (ctx) => {
  ctx.body = `
    <h1>Login</h1>
    <form method="post" action="/login">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `;
});

router.post("/login", (ctx: any) => {
  const { email, password } = ctx.request.body;
  const user = users.find((user) => user.email === email);

  if (
    true
  ) {
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

router.get('/users', async (ctx) => {
  try {
    const users = await getAllUsers();
    ctx.body = users;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Database error' };
  }
});

router.post('/updates',async(ctx:any)=>{
  try {
    const { userId, content } = ctx.request.body; // Assuming you're sending userId and content in the request body

    const insertedId = await insertUpdate(userId, content);
    ctx.status = 201;
    ctx.body = { message: 'Update inserted', insertedId };
  } catch (error) {
    console.error('Error inserting update:', error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to insert update' };
  }
})

app.use(router.routes());

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
