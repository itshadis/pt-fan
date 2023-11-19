/* 
  No.1  Hitunglah jumlah pasang kaos kaki yang dapat dijual oleh sales.

  Contoh:
  Input: [5, 7, 7, 9, 10, 4, 5, 10, 6, 5]
  Output: 3
  Keterangan: Hanya 3 pasang kaos kaki yang dapat dijual (5, 7, 10)

  Soal:
  a. Input: [10 20 20 10 10 30 50 10 20]
  Output yang diharapkan: 3
  b. Input: [6 5 2 3 5 2 2 1 1 5 1 3 3 3 5]
  Output yang diharapkan: 6
  c. Input: [1 1 3 1 2 1 3 3 3 3]
  Output yang diharapkan: 4
*/

const countPair = (arr) => {
  const sameCount = {}

  arr.forEach(e => {
    sameCount[e] = (sameCount[e] || 0) + 1;
  });

  let totalPair = 0;
  
  for(const pair in sameCount) {
    totalPair += Math.floor(sameCount[pair] / 2);
  }

  return totalPair;
}

console.log(countPair([5, 7, 7, 9, 10, 4, 5, 10, 6, 5]));
console.log('a : ', countPair([10, 20, 20, 10, 10, 30, 50, 10, 20]));
console.log('b : ', countPair([6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5]));
console.log('c : ', countPair([1, 1, 3, 1, 2, 1, 3, 3, 3, 3,]));