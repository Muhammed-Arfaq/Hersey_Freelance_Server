import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import catchAsync from '../utils/catchAsync.mjs'
import AppError from '../utils/appError.mjs'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import User from '../Model/userModel.mjs'
import Admin from '../Model/adminModel.mjs'
import Vendor from '../Model/vendorModel.mjs'
import Gig from '../Model/gigModel.mjs'
import Category from '../Model/categoryModel.mjs'
import Book from '../Model/bookingModel.mjs'

// --------------------------------------------------------------------------------------------------------------
// Email OTP Verify

let fullName
let userName
let email
let phone
let password
let passwordConfirm

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'herseyfreelance@gmail.com',
        pass: 'xpgiggtjhxbkrztb',
    }

});

let otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

// --------------------------------------------------------------------------------------------------------------

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    // const cookieOPtions = {
    //     expires: new Date(
    //         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //     ),
    //     httpOnly: true,
    // };
    // if (process.env.NODE_ENV === "production") {
    //     cookieOPtions.secure = true;
    // }
    // res.cookie("jwt", token, cookieOPtions);

    //remove the password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

export const OTP = catchAsync(async (req, res, next) => {

    fullName = req.body.fullName,
        userName = req.body.userName,
        email = req.body.email,
        phone = req.body.phone,
        password = req.body.password,
        passwordConfirm = req.body.passwordConfirm;

    const user = await User.findOne({ email: email })

    if (!user) {

        // send mail with defined transport object
        let mailOptions = {
            to: req.body.email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.status(200).json({
                status: 'success'
            });
        });

    } else {
        res.status(401).json({
            status: 'failed'
        });
    }
})

// exports.resendOTP = catchAsync(async(req, res, next) => {
//     var mailOptions={
//        to: email,
//        subject: "Otp for registration is: ",
//        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
//      };

//      transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);   
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//         res.render('otp',{msg:"otp has been sent"});
//     });
// })

export const verifyOTP = catchAsync(async (req, res, next) => {
    if (req.body.otp == otp) {
        const newuser = await User.create({
            fullName: fullName,
            userName: userName,
            email: email,
            phone: phone,
            password: password,
            passwordConfirm: passwordConfirm
        });

        createSendToken(newuser, 201, res);
        next()
    }
    else {
        res.status(401).json({
            status: 'failed'
        });
    }
})

// export const vendorSignup = catchAsync(async (req, res, next) => {
//     const newVendor = await Vendor.create({
//       fullName: req.body.fullName,
//       userName: req.body.userName,
//       email: req.body.email,
//       phone: req.body.phone,
//       password: req.body.password,
//       passwordConfirm: req.body.passwordConfirm
//     });

//     createSendToken(newVendor, 201, res);
// });

export const vendorOTP = catchAsync(async (req, res) => {

    fullName = req.body.fullName,
        userName = req.body.userName,
        email = req.body.email,
        links = req.body.links,
        phone = req.body.phone,
        password = req.body.password,
        passwordConfirm = req.body.passwordConfirm;

    const vendor = await Vendor.findOne({ email: email })

    if (!vendor) {

        // send mail with defined transport object
        let mailOptions = {
            to: req.body.email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.status(200).json({
                status: 'success'
            });
        });

    } else {
        res.status(401).json({
            status: 'failed'
        });
    }
})

export const verifyVendorOTP = catchAsync(async (req, res) => {
    if (req.body.otp == otp) {
        const newVendor = await Vendor.create({
            fullName: fullName,
            userName: userName,
            email: email,
            links: links,
            phone: phone,
            password: password,
            passwordConfirm: passwordConfirm
        });

        createSendToken(newVendor, 201, res);
    }
    else {
        res.status(401).json({
            status: 'failed'
        });
    }
})

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //to check email and password exist
    if (!email || !password) {
        return next(new AppError("wrong information"));
    }

    //to check if user exists and password is correct
    const user = await User.findOne({
        $and: [{ email }, { status: "Active" }],
    }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("wrong information"));
    }

    //if everything is correct, send token to user
    createSendToken(user, 201, res);
    next();
});

export const adminLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //to check email and password exist
    if (!email || !password) {
        return next(new AppError("wrong information"));
    }

    //to check if admin exists and password is correct
    const admin = await Admin.findOne({
        $and: [{ email }, { status: "Active" }],
    }).select("+password");

    if (!admin || !(await admin.correctPassword(password, admin.password))) {
        return next(new AppError("wrong information"));
    }

    //if everything is correct, send token to admin
    createSendToken(admin, 201, res);
    next();
});

export const vendorLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //to check email and password exist
    if (!email || !password) {
        return next(new AppError("wrong information"));
    }

    //to check if vendor exists and password is correct
    const vendor = await Vendor.findOne({
        $and: [{ email }, { status: "Approved" }],
    }).select("+password");
    console.log(vendor);

    if (!vendor || !(await vendor.correctPassword(password, vendor.password))) {
        return next(new AppError("wrong password"));
    }

    //if everything is correct, send token to vendor
    createSendToken(vendor, 201, res);
    next();
});

export const vendorGig = catchAsync(async (req, res, next) => {
    const newGig = await Gig.create({
        title: req.body.title,
        overview:req.body.overview,
        image:req.body.image,
        type:req.body.type,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    });
    res.status(200).json({
        status: 'success',
        data: {
            newGig
        }
    });
})

export const addCategory = catchAsync(async (req, res, next) => {
    const newCategory = await Category.create({
        name: req.body.name,
    });
    res.status(200).json({
        status: 'success',
        data: {
            newCategory
        }
    });
});

export const bookNow = catchAsync(async(req, res, next) => {
    const userId = mongoose.Types.ObjectId(req.user._id);
    const newBooking = await Book.create({
        userId
    })
})

export const userProtect = catchAsync(async (req, res, next) => {
    let token;
    token = req.body.token;
    console.log(token);
    if (!token) {
            res.json({
                user: false
            })
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    console.log(decoded)
    const currentUser = await User.findOne({_id:decoded.id});
    console.log(currentUser)
    if (!currentUser) {
        return next(
            new AppError(
                res.json({
                    user: false
                })
            )
        );
    }

    const userId = currentUser._id
    console.log(userId);
    res.json({ user: true, currentUser, userId })
});
