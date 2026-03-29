require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


//!fazer os outros
const errorMiddleware = require("./middlewares/error.middleware")



const app = express;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//!fazer as totas


app.use((req, res) => {
    res.status(404).json({message: "Rota não encontrada"})
});

app.use(errorMiddleware);

const PORT = process.env.SERVER_PORT || 3000;

if(process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
    });
}

module.exports = app;