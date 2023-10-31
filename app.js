import dotenv from 'dotenv'
import fs from 'fs'

import { App,  Octokit } from 'octokit'
import { get_py_files, get_repo_tree } from './get_repo_code.js'
import {cleanCodeArray} from './utils.js'
// Load environment variables from .env file
dotenv.config()

// Set configured values
const appId = process.env.APP_ID
const privateKeyPath = process.env.PRIVATE_KEY_PATH
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
//const secret = process.env.WEBHOOK_SECRET



// Create an authenticated Octokit client authenticated as a GitHub App
const installationID = process.env.APP_INSTALLATION_ID; // add function to get installation id from local context


const app = new App({
  appId: appId,
  privateKey: privateKey,
});

const octokit = await app.getInstallationOctokit(installationID);


// Test <-- write unit tests
const tree  = await get_repo_tree("AsmaaMHadir","Customer-Relationship-Manager","main",octokit);

const result = await get_py_files(tree, octokit);

const cleanedResult = cleanCodeArray(result);

// postcondition: code from each py file is stored inside cleanedResult






