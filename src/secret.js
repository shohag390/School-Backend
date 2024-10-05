import dotenv from "dotenv";

//config
dotenv.config();

// all secret key
export const port = process.env.SERVER_PORT || 3002;
export const mongoDB = process.env.MONGO_URL;
export const jwtSecretKey = process.env.JWT_SECRET_KEY;

// export default { port, mongoDB, jwtSecretKey };

// T9WByyV7eDemvHE2
// mdshohagali1539
