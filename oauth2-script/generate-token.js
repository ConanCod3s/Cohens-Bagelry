const { OAuth2Client } = require("google-auth-library");
const readline = require("readline");

// Replace these with your actual values
const CLIENT_ID = "1003087423917-7rbc9p7trshem44fu49nbg7m7b01qiog.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://cohensbagelry.com";

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://mail.google.com/"],
  redirect_uri: REDIRECT_URI,
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
    // Get the tokens from the authorization code
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("Tokens:", tokens);  // Print the tokens to verify
    rl.close();
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    rl.close();
  }
});
