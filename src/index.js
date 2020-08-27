const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;
// HTTP Logger
app.use(morgan("tiny"));

// CORS attack
app.use(cors());

// Set public folder
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
