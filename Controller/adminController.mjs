import Category from "../Model/categoryModel.mjs";
import User from "../Model/userModel.mjs";
import Vendor from "../Model/vendorModel.mjs";
import catchAsync from "../utils/catchAsync.mjs";

export const getAllUsers = catchAsync(async( req, res, next ) => {
    const users = await User.find()
    res.status(200).json({
        status: 'success',
        data: {
          users
        }
      });
})

export const blockUser = catchAsync(async(req, res, next ) => {
    await User.findOneAndUpdate({ _id: req.body.id }, { $set: { status: "Blocked" } })
    res.status(200).json({
        status: 'success'
    })
})

export const unBlockUser = catchAsync(async(req, res, next ) => {
    await User.findOneAndUpdate({ _id: req.body.id }, { $set: { status: "Active" } })
    res.status(200).json({
        status: 'success'
    })
})

export const getAllVendors = catchAsync(async(req, res, next ) => {
    const vendors = await Vendor.find()
    res.status(200).json({
        status: 'success',
        data: {
            vendors
        }
    })
})

export const approveVendor = catchAsync(async(req, res, next ) => {
    await Vendor.findOneAndUpdate({ _id: req.body.id }, { $set: { status: "Approved" } })
    res.status(200).json({
        status: "success"
    })
})

export const blockVendor = catchAsync(async(req, res, next ) => {
    await Vendor.findOneAndUpdate({ _id:req.body.id }, { $set: { status: "Blocked" } })
    res.status(200).json({
        status: "success"
    })
})

export const getVendorDetails = catchAsync(async(req, res, next ) => {
    const vendorDetails = await Vendor.findOne({ _id: req.body.id })
    res.status(200).json({
        status: 'success',
        data: {
            vendorDetails
        }
      });
})

export const getAllCategory = catchAsync( async(req, res, next) => {
    const categories = await Category.find()
    res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    })
})

export const deleteCategory = catchAsync(async(req, res, next ) => {
    await Category.findByIdAndDelete({ _id: req.body.id })
    res.status(200).json({
        status: 'success',
      });
})