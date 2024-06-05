import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { users } from "./users.json";

export const app = express();

const port = 5000;

interface User {
  email: string;
  number: string;
}

interface RequestBody {
  email: string;
  number?: string;
}

app.use(cors());
app.use(express.json());

let pendingRequest: NodeJS.Timeout | null = null;

app.post("/users", (req: Request, res: Response, next: NextFunction) => {
  if (pendingRequest) {
    clearTimeout(pendingRequest);
    pendingRequest = null;
  }

  pendingRequest = setTimeout(() => {
    try {
      const { email, number } = req.body as RequestBody;

      const user = users.filter((user: User) => {
        if (number) return user.email === email && user.number === number;
        return user.email === email;
      });

      res.send(user);
    } catch (error: any) {
      next(error);
    }
    pendingRequest = null;
  }, 5000);
});

app.listen(port, () => {
  console.log(`This server had run on http://localhost:${port}`);
});
