const express = require("express");
const path = require("path");
const db = require("./db");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await db.findAllUsers());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/departments", async (req, res, next) => {
  try {
    res.send(await db.findAllDepartments());
  } catch (ex) {
    next(ex);
  }
});

db.sync()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    })
  )
  .catch(ex => console.log(ex));
//   .then(() => app.listen(3000, () => console.log("listening on port 3000")))
//   .catch(ex => console.log(ex));
