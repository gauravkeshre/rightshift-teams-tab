import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import {
    initializeIdentityService
  } from './identityService.js';
  import {
    getEmployee,
    getOrder,
    getCategories,
    getCategory,
    getProduct
  } from './northwindDataService.js';
  

dotenv.config({path: '../.env'});
const app = express();

// JSON middleware is needed if you want to parse request bodies
app.use(express.json());
app.use(cookieParser());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Allow the identity service to set up its middleware
await initializeIdentityService(app);

app.get('/test', (req, res) => {
  res.status(200).send({message: 'Hello World!'});
});

// // Web service returns an employee's profile
// app.get('/api/employee', async (req, res) => {

//   try {
//     const employeeId = req.query.employeeId;
//     const employeeProfile = await getEmployee(employeeId);
//     res.send(employeeProfile);
//   }
//   catch (error) {
//       console.log(`Error in /api/employee handling: ${error}`);
//       res.status(500).json({ status: 500, statusText: error });
//   }

// });

// // Web service returns order details
// app.get('/api/order', async (req, res) => {

//   try {
//     const orderId = req.query.orderId;
//     const order = await getOrder(orderId);
//     res.send(order);
//   }
//   catch (error) {
//       console.log(`Error in /api/order handling: ${error}`);
//       res.status(500).json({ status: 500, statusText: error });
//   }

// });

// app.get('/api/categories', async (req, res) => {

//   try {
//     const categories = await getCategories();
//     res.send(categories);
//   }
//   catch (error) {
//       console.log(`Error in /api/categories handling: ${error}`);
//       res.status(500).json({ status: 500, statusText: error });
//   }

// });

// app.get('/api/category', async (req, res) => {

//   try {
//     const categoryId = req.query.categoryId;
//     const categories = await getCategory(categoryId);
//     res.send(categories);
//   }
//   catch (error) {
//       console.log(`Error in /api/category handling: ${error}`);
//       res.status(500).json({ status: 500, statusText: error });
//   }

// });

// app.get('/api/product', async (req, res) => {

//   try {
//     const productId = req.query.productId;
//     const product = await getProduct(productId);
//     res.send(product);
//   }
//   catch (error) {
//       console.log(`Error in /api/product handling: ${error}`);
//       res.status(500).json({ status: 500, statusText: error });
//   }

// });


// Make environment values available on the client side
// NOTE: Do not pass any secret or sensitive values to the client!
app.get('/modules/env.js', (req, res) => {
  res.contentType("application/javascript");
  res.send(`
    export const env = {
    };
  `);
});

// Serve static pages from /client
app.use(express.static('client'));

//start listening to server side calls
const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
