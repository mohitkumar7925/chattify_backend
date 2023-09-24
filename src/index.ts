import express from 'express'
require('dotenv').config()
import http from 'http'
import UserRoute from './Routes/UserRoute'
import cors from 'cors'
import morgan from 'morgan'
const app = express();

const server = http.createServer(app);
app.use(cors({
      origin:'*',
      methods:['GET','POST']
}))
app.use(morgan('dev'))
app.use(express.json());

app.use("/user", UserRoute);
app.get('/',(req,res,next)=>{
      
      res.send({message:'It is working', status:true})

})
server.listen(4000, () => {
      console.log("listing on 4000");
});
