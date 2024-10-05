import connectDB from "../db/connectDb.js";
import app from "./app.js";
import { port } from "./secret.js";

app.listen(port, () => {
  connectDB();
  console.log(`server is running at http://localhost:${port}`);
});
