import dotenv from 'dotenv'
import fs from 'fs'

import { App } from 'octokit'
import { get_py_files, get_repo_tree } from './get_repo_code.js'
// Load environment variables from .env file
dotenv.config()

// Set configured values
const appId = process.env.APP_ID
const privateKeyPath = process.env.PRIVATE_KEY_PATH
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
//const secret = process.env.WEBHOOK_SECRET



// Create an authenticated Octokit client authenticated as a GitHub App
const installationID = process.env.APP_INSTALLATION_ID; // does the installation id change from machine to another 
const authenToken = process.env.AUTH_TOKEN;

const app = new App({
  appId: appId,
  privateKey: privateKey,
});



// get repository content 
const tree  = await get_repo_tree("AsmaaMHadir","Predict-my-Math-Grade-","main",authenToken);
console.time("Mytimer");
const result = await get_py_files(tree, authenToken);
console.timeEnd("Mytimer");
console.log(result);



