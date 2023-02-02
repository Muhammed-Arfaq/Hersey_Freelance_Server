import  express  from 'express'
import { approveVendor, blockUser, blockVendor, getAllUsers, getAllVendors, unBlockUser } from '../Controller/adminController.mjs'
import { adminLogin }  from '../Controller/authController.mjs'

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

export default router