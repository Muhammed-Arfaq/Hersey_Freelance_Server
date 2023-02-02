import  express  from 'express'
import { login, OTP, verifyOTP }  from '../Controller/authController.mjs'

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


export default router