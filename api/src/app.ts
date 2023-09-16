import express, { Express } from "express";
import cors from "cors";
import * as routes from "./routes";
import { reqLogger } from "./middlewares/logger";
import { auth } from "./middlewares/auth";
import cron from "node-cron";
import config from "./utils/config";

const corsOptions = {
  origin: ["https://kallpa.onrender.com"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type,Authorization", "Content-Type", "id"],
};

const corsOPtionsDev = {
  origin: ["http://localhost:4602"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type,Authorization", "Content-Type", "id"],
};

function initializeMiddlewares(server: Express) {
  server.use(express.json({ limit: "5mb" }));
  server.use(express.urlencoded({ extended: true }));
  // Check if in production mode
  if (config.NODE_ENV === "production") {
    server.use(cors(corsOptions)); // Use specific CORS options in production
  } else {
    server.use(cors(corsOPtionsDev));
  }
}

const routeMappings = [
  { path: "/api/person", router: routes.PersonRouter },
  { path: "/api/investment", router: routes.InvestmentRouter },
  { path: "/api/proyect", router: routes.ProyectRouter },
];

function initializeRoutes(server: Express) {
  routeMappings.forEach((route) => {
    server.use(route.path, auth, reqLogger, route.router);
  });
}

cron.schedule("15 0 30 8 *", () => {
  console.log("Tarea programada completada.");
});

const server = express();
initializeMiddlewares(server);
initializeRoutes(server);

export default server;
