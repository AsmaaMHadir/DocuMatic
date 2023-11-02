import { Buffer } from 'buffer';

export const decodeBase64 = (data) => {
    return Buffer.from(data, 'base64').toString('utf8');
}

export const processPath = (filePath) =>{
    const parts = filePath.split("/");
  
    // Get the last element in the array
    const lastPart = parts[parts.length - 1];
    
    // Check if the last part ends with ".py" and the path contains directories
    if (parts.length > 1 && lastPart.endsWith(".py")) {
      return lastPart;
    } else {
      return filePath;
    }
}

export function getKeyByValue(object, targetValue) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key] === targetValue) {
      return key;
    }
  }
  return null; // Return null if the value is not found
}

export const cleanCodeArray = (codeArray) => {

  // Clean up each code snippet
  const cleanedCodeArray = codeArray
    .filter((codeSnippet) => codeSnippet.trim() !== '') // Remove empty code snippets
    .map((codeSnippet) => codeSnippet.trim()) // Trim leading and trailing whitespace
    .join('\n'); // Join the lines with newline characters

  return cleanedCodeArray;
}


// Function to generate the prompt for the OpenAI API 
export const generatePrompt = (code) => {
  return `You are a code documentation generator: given this page of code: ${code}, go over the code and document its elements. 
  The elements could either be a function, a class, a class method, or a class variable. 
  After going over the code and fully understanding what each element does, generate a documentation for each of these elements. 
  For example, if the element is a function then you specify the function's arguments, output, behavior, return type and value. 
  If the element is a class then you specify its methods and document them like a function. 
  Your documentation should have the following structure for a function's documentation:
  - function name
  - Brief description of what the function does
  - Arguments and their types:...
  -Return type:
  Similarly, you should document a class and its method and attributes in a similar fashion.
  The final documentation should be in markdown, easy and straightforward to read. `
};


