// Imports
import path from "path";
import https from "https";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

// Constants
const app: express.Application = express();
const PORT: string = process.env.PORT || "5000";
const isLocalhost: boolean = PORT === "5000";

// Configure a new express application instance
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/../", "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/../", "public")));

// Serve SLDS from the node-modules package
app.use("/slds", express.static(path.join(__dirname, "/../node_modules/@salesforce-ux/design-system/assets/")));

app.get("/", (req, res, next) => {
	res.render("pages/home");
});

app.get("/json", (req, res, next) => {
	const jsonFilePath = `${path.join(__dirname, "/../public", "/data.json")}`;

	res.header("Content-Type", "application/json");
	res.sendFile(jsonFilePath);
});

app.get("/upper", (req, res, next) => {
	res.send(req.query.msg.toUpperCase());
});

app.get("/dttm", (req, res, next) => {
	res.send(JSON.stringify(new Date()).replace(/"/g, ""));
});

// curl -X POST 'http://localhost:5000/echo' -H "Content-Type: application/json" -d '{"A":1,"B":2}'
app.post("/echo", (req, res, next) => {
	res.send(req.body);
});

// Start server (HTTP)
app.listen(PORT, () => {
	if (isLocalhost) {
		console.log(`Listening on http://localhost:${PORT}/`);
	} else {
		console.log("Heroku server started");
	}
});
