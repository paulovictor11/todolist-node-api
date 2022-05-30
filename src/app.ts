import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { projectRoutes } from "./routes/project.routes";
import { taskRoutes } from "./routes/task.routes";

export const app = express();

app.use(express.json());
app.use(cors());

// ! Api Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
