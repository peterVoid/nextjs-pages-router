import { getCar, getCarWithId } from "@/utils/db/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.hello![1]) {
    const dec = await getCarWithId("cars", req.query.hello![1]);
    res.status(200).json({ status: "success", statusCode: 200, dec });
  }
  const dec = await getCar("cars");
  res.status(200).json({ status: "success", statusCode: 200, dec });
}
