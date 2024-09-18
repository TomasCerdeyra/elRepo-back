import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import configurePassport from "./config/passport.js";
import { connectDB } from "./config/db.js";
import session from "express-session";
import AuthRoutes from './routes/authRoutes.js'
import CarrerasRoutes from "./routes/carrerasRoutes.js";
import MateriasRoutes from './routes/materiasRoutes.js'

//Configuro variables de entorlo para la apiclacion
dotenv.config();

connectDB()
const app = express();

//Permito el formato json
app.use(express.json());

// Configura la sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Configura Passport
configurePassport(); // Llama a la función para configurar Passport
app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.use("/api/auth", AuthRoutes)
app.use("/api/carreras", CarrerasRoutes);
app.use("/api/materias", MateriasRoutes);

export default app;
