import cnf from "dotenv";
cnf.config();

const config = {
  apiPort: process.env.API_PORT || 4503,
  api_key: process.env.API_KEY || "957902342",
  db_user: process.env.DB_USER || "",
  db_host: process.env.DB_HOST || "",
  db_database: process.env.DB_DATABASE || "",
  db_password: process.env.DB_PASSWORD || "",
  db_port: process.env.DB_PORT || 5432,
  db_keepalive: process.env.DB_KEEPALIVE || true,
  NODE_ENV: process.env.NODE_ENV || "production",
  database_connection: process.env.DATABASE_CONNECTION || "",

  email: {
    emailHost: process.env.EMAIL_SMTP || "smtp.gmail.com",
    emailLogin: process.env.EMAIL_LOGIN || "willypruebas6@gmail.com",
    emailPassword: process.env.EMAIL_PASSWORD || "eudmtghkudsatwle",
    emailPort: process.env.EMAIL_PORT || 465,
    emailFrom: process.env.EMAIL_FROM || "PortalReclamo",
    emailSecure: process.env.EMAIL_SECURE === "true",
  },
};

export default config;
