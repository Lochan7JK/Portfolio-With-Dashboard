import requestIp from "request-ip";
import {UAParser} from "ua-parser-js";
import db from "../db.js";

const trackVisitor = async (req, res, next) => {
  try {
    const ip = requestIp.getClientIp(req);

    const parser = new UAParser(req.headers["user-agent"]);
    const device = parser.getDevice().type || "desktop";

    await db.query(
      `
      INSERT INTO visitors
      (ip_address, user_agent, device_type, page)
      VALUES ($1, $2, $3, $4)
      `,
      [
        ip,
        req.headers["user-agent"],
        device,
        req.originalUrl,
      ]
    );

  } catch (err) {
    console.log(err);
  }

  next();
};

export default trackVisitor;