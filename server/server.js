const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const connectDB = require('./db')
const cors = require('cors')
const app = express()
require('dotenv').config()

connectDB()
app.use(cors())
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=>{
    console.log('Listening on port 4000')
})