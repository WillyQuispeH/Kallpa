import createLogger from "../utils/logger";
import * as ModelNodeMailer from "../models/nodeMailer";
const cron = require("node-cron");

type MailOptionsT = {
  subject: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
};

type AttachmentsT = {
  fileName: string;
  urlDoc: String;
};

const send = async (req: any, res: any) => {
  try {
    const { mailOptions, attachments } = req.body;

    const emailSent = await ModelNodeMailer.send(mailOptions, attachments);

    createLogger.info({
      controller: "send/emailSender",
      data: emailSent,
    });

    res
      .status(200)
      .json({ success: true, data: emailSent.response, error: null });
  } catch (e) {
    createLogger.error({
      controller: "send",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

export { send };
