const { OAuth2Client } = require("google-auth-library");
const readline = require("readline");
const secrets = require("./secrets.json");


// Initialize the OAuth2 client
const CLIENT_ID = secrets.CLIENT_ID;
const CLIENT_SECRET = secrets.CLIENT_SECRET;
const REDIRECT_URI = secrets.REDIRECT_URI;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate a URL for obtaining user consent
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://mail.google.com/"],
});

console.log("Authorize this app by visiting this url:", authUrl);

(async () => {
    const open = (await import("open")).default;
    await open(authUrl);
})();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter the code from that page here: ", async (code) => {
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        console.log("Access Token:", tokens.access_token);
        console.log("Refresh Token:", tokens.refresh_token);
        rl.close();
    } catch (error) {
        console.error("Error retrieving access token:", error);
        rl.close();
    }
});