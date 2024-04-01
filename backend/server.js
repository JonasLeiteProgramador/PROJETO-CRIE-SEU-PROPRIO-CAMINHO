import  express  from "express";
import { testConnection } from "./database/connection.js";


const app = express()
const port = 7777



app.use(express.json())

app.listen(port,()=> testConnection(), console.log(`Server is running on the port  ${port} `))