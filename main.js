const PORT = 4000;

const express = require("express")
const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Server is running...")
})

const categoriesRouter = require('./Routers/categories')  
const productsRouter = require('./Routers/products')

app.use('/categories', categoriesRouter)
app.use('/products', productsRouter)

//LISTEN PORT
app.listen(PORT, () => {
    console.log("Server has been run...")
})
