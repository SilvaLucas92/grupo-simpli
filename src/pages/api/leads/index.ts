import { connectMongoDB } from "@/libs/mongodb";
import Leads from "@/models/Leads";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only post allowed" });
    return;
  }
  try {
    connectMongoDB();
    Leads.create(req.body).then((data) => {
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(400).json({ err, msg: "Something went wrong222" });
  }
};

export default handler;
