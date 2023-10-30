import {decodeBase64, processPath} from "./utils.js"
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
    const file_dict = {};
    for (const idx in indices){
      if ( tree[idx].path.endsWith('.py')){
    
        // get file name
        const fileName = processPath(tree[idx].path);

        // get url 
        const content_url = tree[idx].url;
     
        // make api call to the url
        const octokit = new Octokit({
            auth: authenToken
          });
        const response = await octokit.request(content_url, {
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
            file_dict[fileName] = decodeBase64(file_content);
        }

      }
    
    }
    return file_dict;
  }
  
  
  
  
  



