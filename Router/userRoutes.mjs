import  express  from 'express'
import { login, OTP, verifyOTP }  from '../Controller/authController.mjs'
import { getAllGigs, getAllVendor, getVendorDetail, products, services } from '../Controller/userController.mjs'

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

router
    .route('/allGigs')
    .get(getAllGigs)

router
    .route('/services')
    .get(services)

router
    .route('/products')
    .get(products)


export default router