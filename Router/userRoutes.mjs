import  express  from 'express'
import { login, OTP, verifyOTP }  from '../Controller/authController.mjs'
import { getAllVendor, getVendorDetail } from '../Controller/userController.mjs'

const router = express.Router()

router
    .route('/login')
    .post(login)
    
router
    .route('/OTP')
    .post(OTP)

router
    .route('/verifyOTP')
    .post(verifyOTP)

router
    .route('/getAllVendors')
    .get(getAllVendor)

router
    .route('/vendorDetails/:id')
    .get(getVendorDetail)


export default router