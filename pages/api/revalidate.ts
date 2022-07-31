import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const pathToRevalidate: string = req.query.revalidate_path as string;
    try {
        await res.revalidate(pathToRevalidate);
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
}