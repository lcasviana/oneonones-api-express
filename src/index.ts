import express, { Request, Response, Router } from "express";

const app = express();
const route = Router();
const port = 3000;

app.use(express.json());

route.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

app.use(route);

app.listen(port, () => console.log(`http://localhost:${port}`));
