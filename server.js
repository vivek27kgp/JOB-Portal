// api imports
import swaggerDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// package imports
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// security
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// files imports
import connectDB from './config/db.js';

// routes
import testRoute from './routes/testRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import jobsRoute from './routes/jobsRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// config
dotenv.config();

// mongoDB connection
connectDB();

// Swagger api config
// api options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal Application',
      description: 'Node Expressjs Job Portal Application',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        // url: "https://nodejs-job-portal-app.onrender.com"
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const spec = swaggerDoc(options);

// rest object
const app = express();

// middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/test', testRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/job', jobsRoute);

// homeroute root
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware
app.use(errorMiddleware);

// port
const port = process.env.PORT || 8080;

// listen
app.listen(port, () => {
  console.log(`Server Running in ${process.env.DEV_MODE} mode on port ${port}`);
});
