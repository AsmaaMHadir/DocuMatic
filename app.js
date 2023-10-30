import dotenv from 'dotenv'
import fs from 'fs'
import http from 'http'
import { App } from 'octokit'

// Load environment variables from .env file
dotenv.config()

// Set configured values
const appId = process.env.APP_ID
const privateKeyPath = process.env.PRIVATE_KEY_PATH
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
const secret = process.env.WEBHOOK_SECRET



// Create an authenticated Octokit client authenticated as a GitHub App
const installationID = process.env.APP_INSTALLATION_ID; // does the installation id change from machine to another 

const app = new App({
  appId: appId,
  privateKey: privateKey,
});


// get repository content 
const response = await app.octokit.request("GET /repos/{owner}/{repo}/issues", {
  owner: "github",
  repo: "docs",
  per_page: 2
});






