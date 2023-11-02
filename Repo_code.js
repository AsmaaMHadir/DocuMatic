import {decodeBase64, cleanCodeArray} from "./utils.js"

const cache = {};
// step 1- get repo tree recursively as Json
export const get_repo_tree = async (owner, repoName, branchName,okt) =>{

    // Define a unique key for this request based on owner, repoName, and branchName.
    const cacheKey = `${owner}-${repoName}-${branchName}`;

    if (cache[cacheKey]) {
      // If the data is in the cache, return it.
      return cache[cacheKey];
    }
  
    const response = await okt.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=true', {
        owner: owner,
        repo: repoName,
        tree_sha: branchName,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
          
        }
      });

    const data = response.data;
    const repo_tree = data.tree;

    
    // Store the fetched data in the cache for later use.
    cache[cacheKey] = repo_tree;
    return repo_tree;
}



// !! implement cache 
export const get_content_by_file_path = async (owner, repoName,filePath,okt) => {

    // 1 - check if in cache
    console.log('entered')
    const response = await okt.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: owner,
      repo: repoName,
      path: filePath,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }) 
    console.log('api call done')
    const data = response.data;
    const fileContent = data.content;
    // 4- decode file content and return 
    const contentDecoded = decodeBase64(fileContent);

    return contentDecoded;


  }
  

// allow user to pass folder name in which there are files to be documented.
// allow user to pass file names to be ignored 
export const get_content_by_folder = async (owner, repo,folderPath,okt,ignore_files=[]) => {

    /*
    retrieves file contents inside a folder not containing any subfolders
    */
    const response = await okt.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: owner,
      repo: repo,
      path: folderPath,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }) 
    
    console.log('getting folder tree done..');
    const data = response.data
    const indices = Object.keys(data);
    const filesContent = {};

    console.log('enter loop over files');
    for (const idx in indices){

      const fileName = data[idx].name;
      const filePath = data[idx].path;
      const content = await get_content_by_file_path(owner, repo, filePath,okt );
      filesContent[fileName] = content;
    }

    return filesContent;

  }
  

  
  



