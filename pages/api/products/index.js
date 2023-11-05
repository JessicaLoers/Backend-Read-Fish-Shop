import Product from "@/db/models/Product";
import dbConnect from "@/db/connect.js";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const products = await Product.find();
    return response.status(200).json(products);
  }
}
