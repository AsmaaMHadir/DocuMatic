import dotenv from 'dotenv'
import fs from 'fs'

import { OpenAIclass } from "./OpenAI.js";
import { App,  Octokit } from 'octokit'
import { get_content_by_file_path, get_content_by_folder } from './Repo_code.js'
import {cleanCodeArray, generatePrompt} from './utils.js'

dotenv.config()


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


console.log('started function')
//const fileContent  = await get_content_by_file_path("AsmaaMHadir","ivy","ivy/functional/frontends/mxnet/numpy/linalg.py",octokit);

// const folderFilesContents = await get_content_by_folder("AsmaaMHadir","ivy","ivy/functional/frontends/mxnet/numpy",octokit)
// console.log('getting file content done..');
// console.log(folderFilesContents);

// Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable

console.log('calling the openai chat completion ')
const openAI = new OpenAIclass(process.env.OPENAI_KEY);
const codeSnippet = "";
const model = 'gpt-3.5-turbo';


console.log('querying chatgpt')
// Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model and max token value
await openAI.generateText(generatePrompt(codeSnippet), model, 800)
    .then(text => {
        // Logging the generated text to the console
        // In the future, this will be replaced to upload the returned blog text to a WordPress site using the WordPress REST API
        console.log(text);
    })
    .catch(error => {
        console.error(error);
    });

