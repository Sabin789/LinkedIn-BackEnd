import  Express  from "express";
import listEndpoints from "express-list-endpoints";
import { badRequestHandler, genericErrorHandler, notAuthorizedHandler, notFoundHandler } from "./ErrorHandlers.js";
import mongoose from "mongoose"
import {join} from "path";
import cors from 'cors';
import UsersRouter from "./Api/Routes/Usersrouter.js";
import ExperienceRouter from "./Api/Routes/ExperienceRouter.js";
import PostsRouter from "./Api/Routes/PostsRouter.js";
import UsersFileRouter from "./Api/Routes/Files/UsersFileRouter.js";
import PostsFileRouter from "./Api/Routes/Files/PostsFileRouter.js";





const server=Express()
const port=process.env.PORT  
server.use(Express.json())
const PublicFolderPath=join((process.cwd()),"./Public/img")
server.use(Express.static(PublicFolderPath))


const whiteList=[process.env.FE_DEV_URL, process.env.FE_PROD_URL]

const corsOpt={
    origin: (currentOrigin, corsNext) => {
      if (!currentOrigin || whiteList.indexOf(currentOrigin) !== -1) {
       
        corsNext(null, true)
      } else {
   
        corsNext(createHttpError(400, `Origin ${currentOrigin} is not in the whitelist!`))
      }
    },
  }

  server.use(
    cors(corsOpt)
  )


  server.use("/api",UsersRouter)
  server.use("/api",ExperienceRouter)
  server.use("/api",PostsRouter)
  server.use("/api",UsersFileRouter)
  server.use("/api",PostsFileRouter)


server.use(badRequestHandler)
server.use(notAuthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)





mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on("connected",()=>{
    console.log("succesfully connected to mongo")
})

server.listen(port,()=>{
    // console.table(listEndpoints(server))
    console.log(process.env.FE_DEV_URL)
    console.log(`Server is listening on port ${port}`)
})