import express from 'express'
import http from 'http'
import UserRoute from './Routes/UserRoute'



const app = express();
const server = http.createServer(app);


app.use(express.json());

app.use("/user", UserRoute);
app.get('/',(req,res,next)=>{
      
      res.send({message:'It is working', status:true})

})
server.listen(4000, () => {
      console.log("listing on 4000");
});
