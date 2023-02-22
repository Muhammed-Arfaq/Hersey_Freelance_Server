import  express  from 'express'
import { getConnections, vendorGig, vendorLogin, vendorOTP, vendorProtect, verifyVendorOTP }  from '../Controller/authController.mjs'
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
    .patch(vendorProtect, updateVendorAddress)

router
    .route('/addSkill/:id')
    .patch(vendorProtect, updateVendorSkills)

router
    .route('/newGig')
    .post(vendorProtect, vendorGig)

router
    .route('/showGigs')
    .get(vendorProtect, showAllGigs)

router
    .route('/categories')
    .get(vendorProtect, showAllCategory)

router
    .route('/getConnections/:vendorId')
    .get(vendorProtect, getConnections)

export default router