import "dotenv/config";
import express from "express";
import Agenda from "agenda";
import nodemailer from "nodemailer";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dbConnect from "./database/dbConnect.js";
import userRouter from "./routes/user-route.js";
import nodeRouter from "./routes/node-route.js";
import edgeRouter from "./routes/edge-route.js";

// connect to mongoDb database
dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));

const AGENDA_DB_URI =
  process.env.AGENDA_DB_URI || "mongodb://localhost:27017/agenda-jobs";

// // ✅ Connect to MongoDB
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// routers
app.use("/api/user", userRouter);
app.use("/api/node", nodeRouter);
app.use("/api/edge", edgeRouter);

// ✅ Agenda Setup
const agenda = new Agenda({ db: { address: AGENDA_DB_URI } });

agenda.on("ready", () => console.log("✅ Agenda started"));

// ✅ Secure Email Credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Define Agenda Job with Debugging
agenda.define("send email", async (job) => {
  const { email, subject, body, to } = job.attrs.data;
  console.log(`📧 Trying to send email to ${email}...`);

  try {
    console.log("🔍 Email User:", process.env.EMAIL_USER);
    console.log(
      "🔍 Email Pass:",
      process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌"
    );
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    });

    console.log("✅ Email sent successfully!", info);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
});

// ✅ Save Flow & Schedule Email
app.post("/api/save-flow", async (req, res) => {
  try {
    const { nodes } = req.body;
    console.log(req.body);
    console.log("🔄 Received nodes:", nodes);

    await agenda.start();

    let totalDelay = 0;
    let lastWasDelay = false;

    // Helper to parse "4 minutes", "2 hours", etc. into milliseconds
    function parseDelay(valueString) {
      if (!valueString) return 0;

      const [amountStr, unit] = valueString.toLowerCase().split(" ");
      const amount = parseFloat(amountStr); // in case you want "1.5 minutes"

      const unitToMs = {
        second: 1000,
        seconds: 1000,
        minute: 60 * 1000,
        minutes: 60 * 1000,
        hour: 60 * 60 * 1000,
        hours: 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        days: 24 * 60 * 60 * 1000,
      };

      return amount * (unitToMs[unit] || 1000);
    }

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.type === "delayNode") {
        const delay = parseDelay(node.data.value);
        totalDelay += delay;
        lastWasDelay = true;

        console.log(
          `⏱️ Added delay of ${delay / 1000}s, total delay now ${
            totalDelay / 1000
          }s`
        );
      }

      if (node.type === "emailNode") {
        await agenda.schedule(new Date(Date.now() + totalDelay), "send email", {
          email: "abijithr202@gmail.com",
          subject: "Automated Email",
          body: "Hello, this is a scheduled email!",
          to: "jithuabijith8@gmail.com", // Can be node.data.email if dynamic
        });

        console.log(
          `📧 Scheduled email to ${node.data.value} at +${totalDelay / 1000}s`
        );

        if (!lastWasDelay) {
          totalDelay += 1000; // buffer between emails
        }

        lastWasDelay = false;
      }
    }

    res.json({ message: "Flow saved and emails scheduled" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// error handling
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    error: err.error || "Some error occurred",
  });
});

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
