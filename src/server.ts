import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 5000;
async function main() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`mongoose connect with mongodb`);
    app.listen(port, () => {
      console.log(`Server is Running now! ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
