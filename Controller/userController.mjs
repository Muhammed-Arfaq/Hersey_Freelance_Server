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