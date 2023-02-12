import  express  from 'express'
import { vendorGig, vendorLogin, vendorOTP, verifyVendorOTP }  from '../Controller/authController.mjs'
import { showAllCategory, showAllGigs, updateVendorAddress, updateVendorSkills } from '../Controller/vendorController.mjs'

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
    .patch(updateVendorAddress)

router
    .route('/addSkill/:id')
    .patch(updateVendorSkills)

router
    .route('/newGig')
    .post(vendorGig)

router
    .route('/showGigs')
    .get(showAllGigs)

router
    .route('/categories')
    .get(showAllCategory)

export default router