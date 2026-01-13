const db = require("../db");

exports.getNearbyVendors = (req, res) => {
  const { latitude, longitude, radius = 10 } = req.query;
  console.log(radius);
  const getNearbyVendorSql = `SELECT *,
    6371 * ACOS(
        COS(RADIANS(vendor_shop_latitude)) 
        * COS(RADIANS(?)) 
        * COS(RADIANS(? - vendor_shop_longitude)) 
        + SIN(RADIANS(vendor_shop_latitude)) 
        * SIN(RADIANS(?))
    ) AS distance_in_km
FROM vendor_details 
HAVING distance_in_km <= ?;`;
  db.query(
    getNearbyVendorSql,
    [latitude, longitude, latitude, radius],
    (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error while fetching vendors", error });
      res.json(result);
    }
  );
};
