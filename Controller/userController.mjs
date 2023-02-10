import Gig from "../Model/gigModel.mjs";
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