import  express  from 'express'
import { vendorLogin, vendorOTP, verifyVendorOTP }  from '../Controller/authController.mjs'
import { updateVendorAddress, updateVendorSkills } from '../Controller/vendorController.mjs'

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

router  
    .route('/addAddress/:id')
    .post(updateVendorAddress)

router
    .route('/addSkill/:id')
    .post(updateVendorSkills)

export default router