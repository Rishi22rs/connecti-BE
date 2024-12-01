const db = require("../db");
const { getId } = require("../utils/getId");

exports.getVendorDetails = (req, res) => {
  const { id } = req.user;
  const getVendorDetailsSql = `SELECT * FROM vendor_details WHERE uid=?`;
  db.query(getVendorDetailsSql, [id], (error, result) => {
    console.log({ error, result });
    if (error)
      return res
        .status(500)
        .json({ message: "Error while adding vendor details", error });
    res.json(result);
  });
};

exports.addVendorDetails = (req, res) => {
  const uid = getId();
  const addVendorDetailsSql = `UPDATE vendor_details SET 
  vendor_name=?, 
  vendor_shop_name=?, 
  vendor_shop_description=?, 
  vendor_shop_address=? WHERE phone_number=?`;
  const {
    vendor_name,
    vendor_shop_name,
    vendor_shop_description,
    vendor_shop_address,
  } = req.body;
  const { phoneNumber } = req.user;

  db.query(
    addVendorDetailsSql,
    [
      vendor_name,
      vendor_shop_name,
      vendor_shop_description,
      vendor_shop_address,
      phoneNumber,
    ],
    (error, result) => {
      console.log({ error, result });
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

exports.updateVendorStatus = (req, res) => {
  const { id } = req.user;
  const { status } = req.body;
  console.log("status", status);
  const addVendorDetailsSql = `UPDATE vendor_details
  SET status = ?
  WHERE uid=?`;

  db.query(addVendorDetailsSql, [status, id], (error, result) => {
    console.log({ error, result });
    if (error)
      return res
        .status(500)
        .json({ message: "Error while adding vendor details", error });
    res.json(result);
  });
};
