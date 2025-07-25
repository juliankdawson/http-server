import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handlerMetrics(_: Request, res: Response) {
    res.send(`<html>
    <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.fileServerHits} times!</p>
    </body>
</html>
`);
    res.set("Content-Type", "text/html; charset=utf-8");
    res.end();

}
