import {decodeBase64} from "./utils.js"

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

const py_files_cache = {};

export const get_py_files = async (tree,okt) => {

    const indices = Object.keys(tree);
    const fileUrls = [];
    const fileContents = []

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

        const cacheKey = url;

        if (cache[cacheKey]) {
          // If the data is in the cache, use it.
          fileContents.push(cache[cacheKey]);
        } else{
          const response = await okt.request(url, {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
              
            }
          });

          
      const data = response.data;

      // get encoded content 
      const file_content = data.content;
      //console.log(file_content);
      if (file_content != undefined){

          const filecont = decodeBase64(file_content);
          // append to dictionary
          fileContents.push(filecont);

          // Store the fetched data in the cache for later use
          cache[cacheKey] =filecont;
        }

        }
    

      }catch(error){
        console.error(`Error fetching: ${error.message}`);

      }
  

    });
    
    await Promise.all(urlsPromises);

    return fileContents;
  }
  
  
  
  
  



