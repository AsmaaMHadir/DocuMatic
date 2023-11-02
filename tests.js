import { cleanCodeArray}  from "./utils.js";
const result = [
    '## Function: tensordot\n' +
    '\n' +
    '### Description: \n' +
    'This function computes the tensor dot product along specified axes.\n' +
    '\n' +
    '### Arguments:\n' +
    '- a: array_like, shape (n, m)\n' +
    '    The first input array.\n' +
    '- b: array_like, shape (m, p)\n' +
    '    The second input array.\n' +
    '- axes: int or sequence of ints, optional\n' +
    '    The axes to compute the dot product over. Default is 2.\n' +
    '\n' +
    '### Return type:\n' +
    '- Ivy array\n' +
    '\n' +
    '### Returns:\n' +
    '- The tensor dot product of the input arrays.'
  ];


  
console.log(cleanCodeArray(result));

 