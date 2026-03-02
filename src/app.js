const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');

const app = express();
const PORT = 3000;

//Serve static assets and Set views
const assetsPath = path.join(__dirname, "/public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//Middleware
app.use("/", indexRouter);

app.listen(PORT, (error) => {
    if (error){
        throw error;
    }
    console.log(`App listening on port ${PORT}`);
});