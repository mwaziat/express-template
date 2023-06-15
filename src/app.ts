import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import responseTime from 'response-time';
import session from 'express-session';
import router from "./routes";
import cors from "cors";

import dotenv from "dotenv";
import db from "./database/models";
import swaggerDocs from "./utils/swagger";
dotenv.config();

const app = express();

// Middleware untuk mengatur pesan pada setiap permintaan
if (process.env.APP_NODE === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride())

app.use(responseTime())

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.JWT_TOKEN as string,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Definisikan rute-rute Anda di sini
app.use("/", router);

app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));


const dbAuthentication = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

dbAuthentication().then(() => {
  app.listen(process.env.APP_PORT, () => {
    console.log(
      `Server ${process.env.APP_NAME} running on PORT`,
      process.env.APP_PORT
    );
  });
  swaggerDocs(app)
}).catch((error) => {
  console.error('Database authentication failed:', error);
});

