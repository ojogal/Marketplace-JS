import jwt from "jsonwebtoken";

export default function() {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    };

    try {
      const token = req.headers.authorization.split(' ')[1] // Bearer type

      if (!token) {
          return res.status(401).json({message: 'Not authorised'})
      };

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role !== role) {
          return res.status(403).json({message: 'Not authorised'})
      };

      req.user = decoded;
      next()
    } catch (e) {
      res.status(401).json({message: 'Not authorised'})
    }
  }
}