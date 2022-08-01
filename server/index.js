const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
