import express from "express";
import config from "./config/config.js";
import cors from 'cors'
import passport from "passport";
import configurePassport from "./config/passport.js";
import { connectDB } from "./config/db.js";
import session from "express-session";
import AuthRoutes from './routes/authRoutes.js'
import CarrerasRoutes from "./routes/carrerasRoutes.js";
import MateriasRoutes from './routes/materiasRoutes.js'
import MaterialesRoutes from './routes/materialesRouters.js'
import AdminsRoutes from './routes/adminsRoutes.js'

connectDB()
const app = express();

//Permito el formato json
app.use(express.json());

const corsOption = {
    origin: 'http://localhost:5173', // Permitir solo este origen para hacer peticiones
    credentials: true, // Permitir el envío de credenciales
}

app.use(cors(corsOption))

// Configura la sesión
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));


// Configura Passport
configurePassport(); 
app.use(passport.initialize());
app.use(passport.session());

//Sirvo los archivos subidos para tomarlos del front
app.use('/uploads', express.static(config.URL_FIELDS));

//Rutas
app.use("/api/auth", AuthRoutes)
app.use("/api/carreras", CarrerasRoutes);
app.use("/api/materias", MateriasRoutes);
app.use("/api/materiales", MaterialesRoutes)
app.use("/api/admins", AdminsRoutes)

export default app;
