import  express  from 'express'
import { approveVendor, blockUser, blockVendor, deleteCategory, getAllCategory, getAllUsers, getAllVendors, getVendorDetails, unBlockUser } from '../Controller/adminController.mjs'
import { addCategory, adminLogin }  from '../Controller/authController.mjs'

const router = express.Router()

// router
//     .route('/adminSignup')
//     .post(adminSignup)

router
    .route('/login')
    .post(adminLogin)

router
    .route('/userManagement')
    .get(getAllUsers)

router
    .route('/blockUser/:id')
    .post(blockUser)

router
    .route('/unBlockUser/:id')
    .post(unBlockUser)

router
    .route('/vendorManagement')
    .get(getAllVendors)

router
    .route('/approveVendor/:id')
    .post(approveVendor)

router
    .route('/blockVendor/:id')
    .post(blockVendor)

router
    .route('/vendorDetails/:id')
    .get(getVendorDetails)

router
    .route('/addCategory')
    .post(addCategory)

router
    .route('/deleteCategory/:id')
    .post(deleteCategory)

router
    .route('/categories')
    .get(getAllCategory)

export default router