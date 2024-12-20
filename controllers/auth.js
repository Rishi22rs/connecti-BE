const { default: axios } = require("axios");
const db = require("../db");
const { generateToken } = require("../middlewares/auth");
const { getId } = require("../utils/getId");

const isNewUser = (phoneNumber, isVendor) => {
  return new Promise((resolve, reject) => {
    const userDetailsExistsSql = `SELECT 1 FROM ${
      Number(isVendor) ? "vendor_details" : "user_details"
    } WHERE phone_number=?`;
    db.query(userDetailsExistsSql, [phoneNumber], (error, result) => {
      if (error) reject({ message: "Somthing went wrong" });
      else resolve(!result?.length);
    });
  });
};

exports.verifyOtp = (req, res) => {
  const { phone_number: phoneNumber, otp, isVendor } = req.query;
  const verifyPhoneNumberAndOtpSql = `SELECT 1 FROM user_mobile_mapping WHERE phone_number=? AND otp=? LIMIT 1`;
  db.query(
    verifyPhoneNumberAndOtpSql,
    [phoneNumber, otp],
    async (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error while creating OTP", error });
      if (result?.length) {
        const newUser = await isNewUser(phoneNumber, isVendor);
        const newUserUid = getId();
        if (newUser) {
          const insertPhoneNumberSql = `INSERT INTO ${
            Number(isVendor) ? "vendor_details" : "user_details"
          } (uid,phone_number) VALUES (?,?)`;
          db.query(
            insertPhoneNumberSql,
            [newUserUid, phoneNumber],
            (insertPhoneNumberError) => {
              if (insertPhoneNumberError)
                return res
                  .status(500)
                  .json({ message: "Something went wrong", error });
              const deleteOtpSql = `DELETE FROM user_mobile_mapping WHERE phone_number = ?`;
              db.query(
                deleteOtpSql,
                [phoneNumber],
                (deleteError, deleteResult) => {
                  if (deleteError)
                    return res
                      .status(500)
                      .json({ message: "Something went wrong" });
                  res.json({
                    message: "Phone number verified",
                    newUser,
                    token: generateToken({ id: newUserUid, phoneNumber }),
                  });
                }
              );
            }
          );
        } else {
          const deleteOtpSql = `DELETE FROM user_mobile_mapping WHERE phone_number = ?`;
          db.query(deleteOtpSql, [phoneNumber], (deleteError, deleteResult) => {
            if (deleteError)
              return res.status(500).json({ message: "Something went wrong" });
            res.json({
              message: "Phone number verified",
              newUser,
              token: generateToken({ id: newUserUid, phoneNumber }),
            });
          });
        }
      } else res.status(401).json({ message: "Invalid OTP" });
    }
  );
};

exports.createOtp = (req, res) => {
  const id = getId();
  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const { phone_number: phoneNumber } = req.body;
  const addingPhoneNumberAndOtpSql = `INSERT INTO user_mobile_mapping (uid, phone_number,otp)
  VALUES (?,?,?) ON DUPLICATE KEY UPDATE otp=?`;
  // axios
  //   .get(
  //     `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_API_KET}&variables_values=${otp}&route=otp&numbers=${phoneNumber}`
  //   )
  //   .then(() => {
  db.query(
    addingPhoneNumberAndOtpSql,
    [id, Number(phoneNumber), otp, otp],
    (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error while creating OTP", error });
      res.json({ message: "OTP created" });
    }
  );
  // });
};
