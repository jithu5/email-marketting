import "dotenv/config";
import express from "express";
import Agenda from "agenda";
import nodemailer from "nodemailer";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dbConnect from "./database/dbConnect.js";
import userRouter from "./routes/user-route.js";

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

    let totalDelay = 0; // Total time from now for each email
    let lastWasDelay = false;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.type === "delayNode") {
        const delay = (node.data.value || 60) * 1000;
        totalDelay += delay;
        lastWasDelay = true;
      }

      if (node.type === "emailNode") {
        await agenda.schedule(new Date(Date.now() + totalDelay), "send email", {
          email: "abijithr202@gmail.com",
          subject: "Automated Email",
          body: "Hello, this is a scheduled email!",
          to: "jithuabijith8@gmail.com",
        });

        console.log(
          `📧 Scheduled email to ${node.data.value} at +${totalDelay / 1000}s`
        );

        // If the previous node wasn't a delay, add 1 second buffer to simulate immediate next
        if (!lastWasDelay) {
          totalDelay += 1000;
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
