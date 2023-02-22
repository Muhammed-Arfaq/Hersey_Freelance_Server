import  express  from 'express'
import { chat, getConnectionsUser, getMessage, login, OTP, userProtect, verifyOTP }  from '../Controller/authController.mjs'
import { getAllGigs, getAllVendor, getVendorDetail, products, services, singleGig, userProfile } from '../Controller/userController.mjs'

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
    .get(userProtect, getVendorDetail)

router
    .route('/allGigs')
    .get(getAllGigs)

router
    .route('/singleGig/:id')
    .get(userProtect, singleGig)

router
    .route('/services')
    .get(services)

router
    .route('/products')
    .get(products)

router
    .route('/chat')
    .post( chat)

router
    .route('/getMessage/:user1Id/:user2Id')
    .get(getMessage)

router
    .route('/getUserConnections/:userId')
    .get(userProtect, getConnectionsUser)

router
    .route('/userProfile')
    .get(userProtect, userProfile)

export default router