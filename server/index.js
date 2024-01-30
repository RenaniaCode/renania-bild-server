const mongoose = require("mongoose");
const app = require("./app");
const {
    DB_USER,
    DB_HOST,
    DB_PASSWORD,
    API_VERSION,
    IP_SERVER
} = require("./constants");

const PORT = process.env.POST || 10001;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
    (error) => {
        if (error) console.log(error);
        app.listen(PORT, () => {
            console.log("________________________________________________________________________");
            console.log("");
            console.log(`         API REST running in http://${IP_SERVER}:${PORT}/api/${API_VERSION}/  `);
            console.log("");
            console.log("________________________________________________________________________");
        });
});