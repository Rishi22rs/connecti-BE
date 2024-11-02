const db = require("../db");
const { getId } = require("../utils/getId")

exports.addVendorDetails=(req,res)=>{
    const detailUid=getId()
    const addVendorDetailsSql = `INSERT INTO vendor_details (
        uid, 
        auth_uid, 
        vendor_name, 
        vendor_shop_name, 
        vendor_shop_description, 
        vendor_shop_address, 
        phone_number, 
        vendor_shop_latitude, 
        vendor_shop_longitude
    ) 
    VALUES (?,?,?,?,?,?,?,?,?)`;

    const {
      auth_uid,
      vendor_name,
      vendor_shop_name,
      vendor_shop_description,
      vendor_shop_address,
      phone_number,
      vendor_shop_latitude,
      vendor_shop_longitude,
    } = req.body;

    db.query(
      addVendorDetailsSql,
      [
        detailUid,
        auth_uid,
        vendor_name,
        vendor_shop_name,
        vendor_shop_description,
        vendor_shop_address,
        phone_number,
        vendor_shop_latitude,
        vendor_shop_longitude,
      ],
      (error, result) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Error while adding vendor details", error });
        res.json(result);
      }
    );
}

exports.getVendorDetails=(req,res)=>{
    const detailUid=getId()
    const addVendorDetailsSql = `INSERT INTO vendor_details (
        uid, 
        auth_uid, 
        vendor_name, 
        vendor_shop_name, 
        vendor_shop_description, 
        vendor_shop_address, 
        phone_number, 
        vendor_shop_latitude, 
        vendor_shop_longitude
    ) 
    VALUES (?,?,?,?,?,?,?,?,?)`;

    db.query(
      addVendorDetailsSql,
      [
        detailUid,
        auth_uid,
        vendor_name,
        vendor_shop_name,
        vendor_shop_description,
        vendor_shop_address,
        phone_number,
        vendor_shop_latitude,
        vendor_shop_longitude,
      ],
      (error, result) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Error while adding vendor details", error });
        res.json(result);
      }
    );
}