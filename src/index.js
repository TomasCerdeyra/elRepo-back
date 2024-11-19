import app from "./server.js";
import config from "./config/config.js";

const PORT = config.PORT || 8080;

app.listen(PORT, () => {
  console.log("Servidor levantado en el puerto " + PORT);
});
