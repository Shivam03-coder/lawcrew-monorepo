import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Server } from "http";
import { appEnvConfigs } from "./configs";
import { trpcExpress } from "@lawcrew/trpc-server";
interface AppOptions {
  port?: number;
}

class App {
  private readonly app: Application;
  private server?: Server;
  private readonly port: number;

  constructor(options?: AppOptions) {
    this.app = express();
    this.port = options?.port || Number(appEnvConfigs.PORT) || 3000;
    this.initializeMiddlewares();
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: appEnvConfigs.NEXT_APP_URI || "*",
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.app.use(helmet());
    this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    this.app.use(morgan("common"));
    this.app.enable("trust proxy");
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use("/trpc", trpcExpress);
  }

  public listen(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }

  public getAppInstance(): Application {
    return this.app;
  }

  public getServerInstance(): Server | undefined {
    return this.server;
  }
}

export default App;
