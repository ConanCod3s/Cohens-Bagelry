const { functions } = require("firebase-functions");
const { OAuth2Client } = require("google-auth-library");
const readline = require("readline");

// Initialize the OAuth2 client
const CLIENT_ID = functions.config().gmail.client_id;
const CLIENT_SECRET = functions.config().gmail.client_secret;
const REDIRECT_URI = functions.config().gmail.redirect_uri;
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate a URL for obtaining user consent
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://mail.google.com/"],
});

console.log("Authorize this app by visiting this url:", authUrl);

// Dynamically import the `open` package
(async () => {
  const open = (await import("open")).default;
  await open(authUrl);
})();

// Set up readline to get the authorization code from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from that page here: ", async (code) => {
  try {
    // Get the tokens from the authorization code
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);
    rl.close();
  } catch (error) {
    console.error("Error retrieving access token:", error);
    rl.close();
  }
});
