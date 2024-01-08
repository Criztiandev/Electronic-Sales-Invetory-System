import mongoose from "mongoose";
import chalk from "chalk";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Mongo DB Connected: " +
        chalk.bgGreen.hex("black").bold.underline(`${conn.connection.host}`)
    );
  } catch (e) {
    console.error(chalk.bgRed.white.bold(`Error: ${e}`));
    process.exit(1);
  }
};
