const db = require("../db");
const { getId } = require("../utils/getId");

exports.addVendorDetails = (req, res) => {
  const detailUid = getId();
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
};

exports.editVendorDetails = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.json({ message: "No fields to update" });
  }

  let updateFields = [];
  let values = [];

  for (const [key, value] of Object.entries(requestBody)) {
    updateFields.push(`${key} = ?`);
    values.push(value);
  }
  const updateSql = `UPDATE user_details SET ${updateFields.join(
    ", "
  )} WHERE uid = ${req.user.id}`;

  values.push(userId);

  db.query(updateSql, values, (error, result) => {
    if (error) {
      res.status(500).json({ message: "Error updating user details:", error });
      return;
    }
    res.json({ message: "User details updated successfully:", result });
  });
};
