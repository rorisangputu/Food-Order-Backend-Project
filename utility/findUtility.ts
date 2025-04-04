import Vendor from "../models/vendor.model";

export const findVendor = async(id: string | undefined, email? : string) => {
  
  if(email){
    const vendor = await Vendor.findOne({email: email});
    return vendor;
  }else{
    let vendorId = await Vendor.findById(id)
    return vendorId;
  }

}