import Gig from "../Model/gigModel.mjs";
import Vendor from "../Model/vendorModel.mjs"
import catchAsync from "../utils/catchAsync.mjs"

export const updateVendorAddress = catchAsync( async(req, res, next) => {
    console.log(req.params.id);
    let { fullName, userName, email, pincode, country, currentAddress, city, state } = req.body
    await Vendor.findOneAndUpdate({ _id: req.params.id }, { $set: { 
        'fullName': fullName,
        'userName': userName, 
        'email': email, 
        'address.pincode': pincode,
        'address.country': country,
        'address.currentAddress': currentAddress,
        'address.city': city,
        'address.state': state
    }}, { multi:true })
    res.status(200).json({
        status: "success"
    })
})

export const updateVendorSkills = catchAsync( async(req, res, next) => {
    console.log(req.params.id);
    let { skill, googleDrive, linkedIn, github, about, profilePhoto } = req.body
    await Vendor.findOneAndUpdate({ _id: req.params.id }, { $set: { 
        skill,
        googleDrive,
        linkedIn,
        github,
        about,
        profilePhoto
    }}, { multi:true })
    res.status(200).json({
        status: "success"
    })
})

export const showAllGigs = catchAsync(async(req, res, next) => {
    const allGigs = await Gig.find()
    res.status(200).json({
      status: "success",
      data: {
        allGigs
      }
    })
  })