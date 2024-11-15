process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require('express')
const app = express()
const route = require('./routes/mainRoute')
const PORT = 4000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api',route)


app.listen(PORT,()=>{
    console.log(`server is connected on http://localhost:${PORT}`);
})