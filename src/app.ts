import express, { Request, Response } from "express";
import globalError from "./middlewares/globalError";
import cors from "cors"
import { config } from "./config";
import { routes } from "./routes";

const app = express();

const corsOptions = {
    origin: config.FRONTED_URL,
    credentials: true,
};
app.use(express.json());
// app.use(cookieParser())
app.use(cors(corsOptions));
app.use("/api", routes)

// app.post("/api/testing", async (req: Request, res: Response) => {
//     const payload = req.body


//     return res.status(200).json({

//         success: false,
//         message: "success",
//         data: "ha"

//     })
// })
// testing route


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});


//  global error
app.use(globalError);
// not found route

export default app;
