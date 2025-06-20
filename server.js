const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const contact_router=require('./routes/contactRoutes')
const userRouter=require('./routes/userRoutes')
const errorHandler = require('./middleware/errorHandler')
const connectDb=require('./config/dbConnection')


app.use(express.json())
app.use(contact_router)
app.use(userRouter)
app.use(errorHandler)


const startServer = async () => {
  try {
    await connectDb();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`The server is running at port ${port}`);
    });
  } catch (error) {
    console.error('Error: ',error);
  }
};


startServer()