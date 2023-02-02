import  express  from 'express'
import { vendorLogin, vendorOTP, verifyVendorOTP }  from '../Controller/authController.mjs'

const router = express.Router()

router
    .route('/login')
    .post(vendorLogin)

router
    .route('/vendorOTP')
    .post(vendorOTP)

router
    .route('/verifyVendorOTP')
    .post(verifyVendorOTP)

export default router