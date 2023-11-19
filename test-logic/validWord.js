/*
  2. Hitunglah jumlah kata pada sebuah kalimat.

  Contoh:
  Input: Kemarin Shopia per[gi ke mall.
  Output: 4 (Karena kata pergi memiliki special karakter)

  Soal:
  a. Input: Saat meng*ecat tembok, Agung dib_antu oleh Raihan.
  Output: 5
  b. Input: Berapa u(mur minimal[ untuk !mengurus ktp?
  Output: 3
  c. Input: Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.
  Output: 4
*/

const isValidWord = (words) => {
  const arrString = words.split('');
  const lastIndex = arrString.length - 1;
  const validLastIndex = ['.', ',', '?', '!']
  const specialChar = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
  let result = true;

  arrString.forEach(e => {
    specialChar.split('').forEach(el => {
      if(e === el) {
        result = false
      }
    })
  });

  validLastIndex.forEach(e => {
    if(arrString[lastIndex] === e) {
      result = true
    }
  });

  return result
}

const countValidWords = (sentence) => {
  const arrWord = sentence.split(' ');
  let totalValidWords = 0;

  arrWord.forEach(e => {
    const isValid = isValidWord(e);

    if(isValid) totalValidWords++
  });

  return totalValidWords;
}

console.log(countValidWords('Kemarin Shopia per[gi ke mall.'))
console.log('a : ', countValidWords('Saat meng*ecat tembok, Agung dib_antu oleh Raihan'))
console.log('b : ', countValidWords('Berapa u(mur minimal[ untuk !mengurus ktp?'))
console.log('c : ', countValidWords('Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.'))