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

