import  express  from 'express'
import { approveVendor, blockUser, blockVendor, deleteCategory, getAllCategory, getAllUsers, getAllVendors, getVendorDetails, unBlockUser } from '../Controller/adminController.mjs'
import { addCategory, adminLogin, adminProtect }  from '../Controller/authController.mjs'

const router = express.Router()

// router
//     .route('/adminSignup')
//     .post(adminSignup)

router
    .route('/login')
    .post(adminLogin)

router
    .route('/userManagement')
    .get(adminProtect, getAllUsers)

router
    .route('/blockUser')
    .post(adminProtect, blockUser)

router
    .route('/unBlockUser')
    .post(adminProtect, unBlockUser)

router
    .route('/vendorManagement')
    .get(adminProtect, getAllVendors)

router
    .route('/approveVendor')
    .post(adminProtect, approveVendor)

router
    .route('/blockVendor')
    .post(adminProtect, blockVendor)

router
    .route('/vendorDetails')
    .get(adminProtect, getVendorDetails)

router
    .route('/addCategory')
    .post(adminProtect, addCategory)

router
    .route('/deleteCategory')
    .post(adminProtect, deleteCategory)

router
    .route('/categories')
    .get(adminProtect, getAllCategory)

export default router