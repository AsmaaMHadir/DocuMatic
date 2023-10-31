import {decodeBase64, processPath, getKeyByValue} from "./utils.js"
import { Octokit } from "octokit";
// owner = username


// get repo tree and extract ".py files"

// step 1- get repo tree recursively as Json
export const get_repo_tree = async (owner, repoName, branchName,authenToken) =>{

    const octokit = new Octokit({
        auth: authenToken
      });
    const response = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=true', {
        owner: owner,
        repo: repoName,
        tree_sha: branchName,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
          
        }
      });

    const data = response.data;
    const repo_tree = data.tree;
    return repo_tree;
}

export const get_py_files = async (tree,authenToken) => {

    const indices = Object.keys(tree);
    const fileUrls = [];
  const fileContents = []
    const octokit = new Octokit({
      auth: authenToken
    });

    for (const idx in indices){
      if ( tree[idx].path.endsWith('.py')){

        // get url 
        const content_url = tree[idx].url;

        
        fileUrls.push(content_url);
      }
    
    }

    // postcondition: fileUrls contains all python filescontent urls
    
    const urlsPromises = fileUrls.map(async (url)=>{
    
      try{
        const response = await octokit.request(url, {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            
          }
        });

      const data = response.data;

      // get encoded content 
      const file_content = data.content;
      //console.log(file_content);
      if (file_content != undefined){
          // append to dictionary
          fileContents.push(decodeBase64(file_content));
      }
      }catch(error){
        console.error(`Error fetching: ${error.message}`);

      }
  

    });
    
    await Promise.all(urlsPromises);

    return fileContents;
  }
  
  
  
  
  



