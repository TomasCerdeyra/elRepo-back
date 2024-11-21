import dotenv from 'dotenv'
import path from 'path'
import os from 'os'

//Configuro variables de entorlo para la apiclacion
const homeDir = os.homedir()// Obtengo el directorio de inico
const envPath = path.join(homeDir, 'Desktop', 'env')

dotenv.config({ path: envPath });

const config = {
    DB_URL: process.env.DB_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,

    PORT: process.env.PORT,
    ULR_ADMINS: process.env.URL_ADMINS,
    URL_FIELDS: process.env.URL_FIELDS
};

export default config