import Express from "express";
import Payload from "payload";

require("dotenv").config();
const app = Express();

/** Redirect root to Admin panel */
app.get("/", (_, res) => {
	res.redirect("/admin");
});

/** Initialize Payload */
Payload.init({
	secret: process.env.PAYLOAD_SECRET,
	mongoURL: process.env.MONGODB_URI,
	express: app,
	onInit: () => {
		Payload.logger.info(`Payload Admin URL: ${Payload.getAdminURL()}`);
	},
});

// Add your own express routes here
app.listen(3000);
