const { OAuth2Client } = require("google-auth-library");
const readline = require("readline");

// Replace these with your actual values
const CLIENT_ID = "460392213023-g2h8vh6k1r72trrta1bm0q7pf3ihqu8g.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "www.cohensbagelry.com";

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
    rl.close();
  } catch (error) {
    rl.close();
  }
});
