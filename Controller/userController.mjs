import mongoose from "mongoose";
import Booking from "../Model/bookingModel.mjs";
import Gig from "../Model/gigModel.mjs";
import Review from "../Model/reviewModel.mjs";
import User from "../Model/userModel.mjs";
import Vendor from "../Model/vendorModel.mjs"
import catchAsync from "../utils/catchAsync.mjs"

export const getAllVendor = catchAsync(async(req, res, next ) => {
    const allVendors = await Vendor.find()
    res.status(200).json({
        status: 'success',
        data: {
          allVendors
        }
      });
})

export const getVendorDetail = catchAsync(async(req, res ) => {
    const vendorDetails = await Vendor.findOne({ _id: req.params.id })
    res.status(200).json({
        status: 'success',
        data: {
            vendorDetails
        }
      });
})

export const getAllGigs = catchAsync(async(req, res, next) => {
  const allGigs = await Gig.find()
  res.status(200).json({
    status: "success",
    data: {
      allGigs
    }
  })
})

export const singleGig = catchAsync(async(req, res, next) => {
  const gigId = req.params.id
  const singleGig = await Gig.findOne({ _id: gigId }).populate('vendorId')
  res.status(200).json({
    status: "success",
    data: {
      singleGig
    }
  })
})

export const services = catchAsync(async(req, res, next) => {
  const services = await Gig.find({ type: "Service" })
  res.status(200).json({
    status: "success",
    data: {
      services
    }
  })
})

export const products = catchAsync(async(req, res, next) => {
  const products = await Gig.find({ type: "Product" })
  res.status(200).json({
    status: "success",
    data: {
      products
    }
  })
})

export const userProfile = catchAsync(async(req, res, next) => {
  const user = req.user
  console.log(user);
  const profile = await User.findOne({ _id: user._id })
  res.status(200).json({
    status: "success",
    data: {
      profile
    }
  })
})

export const gigRating = catchAsync(async(req, res, next) => {
  const gigId = req.params.gigId
  console.log(gigId);
  const review = await Review.find({ gigId: gigId }).populate("gigId").populate("userId")
  res.status(200).json({
    status: "success",
    data: {
      review
    }
  })
})

export const reservedGigs = catchAsync(async(req, res, next) => {
  const userId = req.user._id
  const reserved = await Booking.find({ userId }).populate("gigId")
  res.status(200).json({
    status: "success",
    data: {
      reserved
    }
  })
})