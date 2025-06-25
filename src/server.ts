import mongoose from "mongoose";
import app from "./app";

const port = 5000;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://library:admin123@cluster0.0vnziom.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`mongoose connect with mongodb`);
    app.listen(port, () => {
      console.log(`Server is Running now! ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
