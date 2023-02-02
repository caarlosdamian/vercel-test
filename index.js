
const authRouter = require('./routers/auth.js')
const storeRouter = require('./routers/store.js')
const cors = require('cors');
const express = require('express');
const { json, urlencoded } = express;

const app = express();
const port = 5002;
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/store", storeRouter);
app.use("/api/auth", authRouter);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

module.exports = app;
