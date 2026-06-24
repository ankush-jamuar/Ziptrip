// const arr = [1, 2, 3, 6, 4, 3, 7, 4, 2, 6, 8, 2, 5, 9, 0, 1];
// const uniqueArray = [...new Set(arr)];
// console.log(uniqueArray);

// const arr = [1, 2, 3, 6, 4, 3, 7, 4, 2, 6, 8, 2, 5, 9, 0, 1];
// const uniqueArray = arr.filter((item, index) => arr.indexOf(item) === index);
// console.log(uniqueArray);

// const arr = [1, 2, 3, 6, 4, 3, 7, 4, 2, 6, 8, 2, 5, 9, 0, 1];
// const uniqueArray = [];
// for (let i = 0; i < arr.length; i++) {
//   if (!uniqueArray.includes(arr[i])) {
//     uniqueArray.push(arr[i]);
//   }
// }
// console.log(uniqueArray);

const arr = [1, 2, 3, 6, 4, 3, 7, 4, 2, 6, 8, 2, 5, 9, 0, 1];
const uniqueArray = arr.reduce((result, current) => {
  if (!result.includes(current)) {
    result.push(current);
  }
  return result;
}, []);
console.log(uniqueArray);
