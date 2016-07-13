// Ritual:
// Question 1:
/*
THERE MAY BE NO VALUE STORED IN ANY ARRAY GREATER THAN NINE (9).

An "Array Integer" is an integer represented by an array, where each digit of the integer is an element in the array. For example, the value 123 (one hundred twenty three) would be stored as follows, note the least significant digit is in the zero-th position.

arrayInt[0] = 3;

arrayInt[1] = 2;

arrayInt[2] = 1;
Implement a method that, given an "ArrayInteger", increments the value by one.

Please use the following method signature

public static int[] incrementArrayInt(int[] arrayInt);
YOU MAY NOT CONVERT THE ARRAY INTO A NUMBER AND THEN BACK INTO AN ARRAY. THERE MAY BE NO VALUE STORED IN ANY ARRAY GREATER THAN NINE (9).
*/

function incrementArrayInt(array) {
  // setting up result array with 1 more index than input array
  var resultArray = array;
  resultArray.push(0);  // placeholder for additional significant digit
    
  // Incrementation  
  var i = 0;
  var maxIndex = resultArray.length - 1;
  while (i <= maxIndex) {
    // increment by 1 if less than 9 and exit loop
    if (array[i] < 9) {
      resultArray[i] = array[i] + 1;
      break;
    }
    // if 9, increment to zero, and advance index to next significant digit
    else {
      resultArray[i] = 0;  
      i++;
    }
  }
  
  // Drop placeholder if 0
  if (resultArray[resultArray.length -  1] === 0) {
      resultArray.pop();
  }  
  return resultArray;
}

// Question 2
/*
Implement a method that, given an "ArrayInteger", adds another "ArrayInteger". You may use whatever array class you like.

Please use the following method signature

public static int[] addArrayInt(int[] arrayInt, int[] otherInt);
An integer value is represented in an array such that the integer may be any size. For example, the value 123 (one hundred twenty three) would be stored as follows:

arrayInt[0] = 3;

arrayInt[1] = 2;

arrayInt[2] = 1;
Given the inputs 123 and 456 the result would be:

arrayInt[0] = 9;

arrayInt[1] = 7;

arrayInt[2] = 5;
YOU MAY NOT CONVERT AN ARRAY INTO A NUMBER AND THEN BACK INTO AN ARRAY. THERE MAY BE NO VALUE STORED IN ANY ARRAY GREATER THAN NINE (9).
*/

function addArrayInt(array, other) {
  var arrayShort = [];
  var arrayLong = [];
  var currentSum = 0;
  var i = 0;
  
  // making sure we can identify the long and short arrays
  if (array.length < other.length) {
    arrayShort = array;
    arrayLong = other;
  }
  else {
    arrayShort = other;
    arrayLong = array;
  }
    
  var resultArray = arrayLong;
  resultArray.push(0); // placeholder for additional significant digit if needed  
  
  // Adding the two arrays for the length of shorter one
  while(i < arrayShort.length) {
      currentSum += arrayShort[i] + arrayLong[i];
      resultArray[i] = currentSum;
      if (currentSum > 9) {
          resultArray[i] -= 10;
          currentSum = 1; // -= resultArray[i];
      }
      else {
          currentSum = 0; // reset to 0
      }
      i++;
  }

  // If there are remaining integers in longer one, repeat
  while (i < arrayLong.length) {
      currentSum += arrayLong[i];
      resultArray[i] = currentSum;
      if (currentSum > 9) {
          resultArray[i] -= 10;
          currentSum = 1; //-= resultArray[i];
      }
      else {
          currentSum = 0; // reset to 0
      }
      i++;
  }  
  
  // Remove placeholder digit if not needed:
  if (resultArray[resultArray.length - 1] === 0) {
      resultArray.pop();
  }
  return resultArray;
}

// Question 3
/*
Implement a method that, given an "ArrayInteger", multiplies another "ArrayInteger". You may use whatever array class you like.

Please use the following method signature

public static int[] multiplyArrayInt(int[] arrayInt, int[] otherInt);
An integer value is represented in an array such that the integer may be any size. For example, the value 123 (one hundred twenty three) would be stored as follows:

arrayInt[0] = 3;

arrayInt[1] = 2;

arrayInt[2] = 1;
Given the inputs 123 and 3 the result would be:

arrayInt[0] = 9;

arrayInt[1] = 6;

arrayInt[2] = 3;
YOU MAY NOT CONVERT AN ARRAY INTO A NUMBER AND THEN BACK INTO AN ARRAY. THERE MAY BE NO VALUE STORED IN ANY ARRAY GREATER THAN NINE (9).
*/

THIS IS a DNF... does not work for 24;24 but works for 12;12 
function multArrayInt(array, other) {
  var resultArray = [];
  var currentProduct = 0
  var remainder = 0;
  var carryOver = 0;
    
  for (var n = 0; n < (array.length + other.length); n++) {
      resultArray.push(0);
  }
  
  // loop through first array
  for (var i = 0; i < array.length; i++) {
      // loop through second array for each number in first array:
      for (var j = 0; j < other.length; j++) {
          currentProduct = (array[i] * other[j]) + carryOver;
      
          if (currentProduct > 9) {
              carryOver = Math.floor(currentProduct / 10); // base 10
              currentProduct = currentProduct % 10;
              resultArray[i + j] += currentProduct;
              resultArray[i + j + 1] += carryOver;
          }
          else {
              carryOver = 0; //reset carryOver to 0
              resultArray[i + j] += currentProduct;
              
              // apply same base 10 logic from currentProduct to resultArray[i+j]
              if (resultArray[i + j] > 9) {
                  remainder = Math.floor(resultArray[i + j] / 10);
                  resultArray[i + j] -= remainder * 10;
                  resultArray[i + j + 1] += Math.floor(resultArray[i + j] / 10);
                  carryOver += remainder;
              }
          }
      }
  }
    
  var checkSum = 0;
  for (var k = 0; k < resultArray.length; k++) {
      checkSum += resultArray[k];
  }
  if (checkSum === 0) {
      resultArray = [0];
  }
  // Remove placeholder digit if not needed:
  else if (resultArray[resultArray.length - 1] === 0) {
      resultArray.pop();
  }
  
  return resultArray; 
}
