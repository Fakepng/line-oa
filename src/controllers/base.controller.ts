import type { Request, Response } from "express";

async function baseController(req: Request, res: Response) {
  return res.status(200).json({ message: "What are you doing?" });
}

export { baseController };
