import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import userRouter from './Router/userRoutes.mjs'
import vendorRouter from './Router/vendorRoutes.mjs'
import adminRouter from './Router/adminRoutes.mjs'

const app = express()

app.use((req, res, next) => {
  res.header("Cache-Control", "private,no-cache,no-store,must-revalidate");
  next();
});

app.use(cors({ origin: true }));
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//File upload
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     console.log(file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//   }
// })

// const fileFilter = (req, file, cb) => {
//    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
//     cb(null, true)
//    }
//    else{
//     cb(null, false)
//    }
// }

// app.use(multer({dest:'public/img/', storage: fileStorage, fileFilter: fileFilter}).array("imageUrl", 10))

app.use('/', userRouter)
app.use('/admin', adminRouter)
app.use('/vendor', vendorRouter)
// app.use('*',(req, res) =>{
//   res.render('pageNotFound')
// })

export default app;