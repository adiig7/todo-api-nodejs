import { app } from "./app.js"
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT, (req, res) => {
  console.log("Server started at Port 3000");
});