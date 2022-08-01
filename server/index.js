const express = require("express");
const authRouter = require("./routes/auth");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
