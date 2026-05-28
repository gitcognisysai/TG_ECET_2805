const express = require("express");
const cors = require("cors");

const paymentRoutes = require("./routes/paymentRoutes");
const sbiPaymentRoutes = require("./routes/sbiPaymentRoutes");

const app = express();

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tgecetwp.in",
      "https://www.tgecetwp.in",
      "http://13.126.222.211:5173",
      "http://13.126.2222.211"
    ],
    credentials: true
  })
);

/*
|--------------------------------------------------------------------------
| BODY PARSER
|--------------------------------------------------------------------------
*/

// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| ROOT ROUTE
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

  res.status(200).send("Backend Running Successfully");

});

/*
|--------------------------------------------------------------------------
| API ROOT
|--------------------------------------------------------------------------
*/

app.get("/api", (req, res) => {

  res.status(200).json({
    success: true,
    message: "API is working"
  });

});

/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Backend is healthy"
  });

});

/*
|--------------------------------------------------------------------------
| PAYMENT HEALTH
|--------------------------------------------------------------------------
*/

app.get("/api/payments/health", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Payment API working"
  });

});

/*
|--------------------------------------------------------------------------
| SBI HEALTH
|--------------------------------------------------------------------------
*/

app.get("/api/sbi/health", (req, res) => {

  res.status(200).json({
    success: true,
    message: "SBI API routes working"
  });

});

/*
|--------------------------------------------------------------------------
| PAYMENT ROUTES
|--------------------------------------------------------------------------
*/

app.use("/api/payments", paymentRoutes);

/*
|--------------------------------------------------------------------------
| SBI PAYMENT ROUTES
|--------------------------------------------------------------------------
*/

app.use("/api/sbi", sbiPaymentRoutes);

/*
|--------------------------------------------------------------------------
| 404 HANDLER
|--------------------------------------------------------------------------
*/

app.use((req, res) => {

  return res.status(404).json({
    success: false,
    message: "Route Not Found"
  });

});

/*
|--------------------------------------------------------------------------
| GLOBAL ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {

  console.error("=================================");
  console.error("GLOBAL ERROR =>");
  console.error(err);
  console.error("=================================");

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });

});

module.exports = app;
