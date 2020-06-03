export default function cleanNumber(num, maxLength) {
  /*Return cleaned number. 
      - if given scientific notation, trim size and trailing zeroes and format
      - if given number greater than maxLength:
        - if decimal appears in first <maxLength> digits, set precision to maxLength and trim trailing 0's
        - else, convert to scientific notation and trim size and trailing zeroes 
  */
  let numStr = num.toString();
  if (isSciNot(num)) {
    return cleanSciNot(num, maxLength);
  } else {
    if (numStr.replace('.', '').length > maxLength) {
      if (numStr.slice(0,maxLength).includes('.') || numStr[maxLength] == '.') {
        return remZeroTrail(num.toPrecision(maxLength));
      } else {
        let sciNot = num.toExponential();
        return cleanSciNot(sciNot, maxLength);
      }
    } else {
      return numStr;
    }
  }
}

export function fromSciNot(num) {
  if (!isSciNot(num)) return parseFloat(num);
  let [coeff, exp] = num.toString().split('e');
  return parseFloat(coeff) * (10 ** parseInt(exp));
}

function remZeroTrail(num) {
  num = num.toString();
  const pat = new RegExp('0+$');
  let newNum = num.replace(pat, '');
  if (newNum[newNum.length - 1] == '.') {
    newNum = newNum.replace('.', '');
  }
  return newNum;
}

function isSciNot(num) {
  // Return true if number is in scientific notation
  let numStr = num.toString();
  return numStr.includes('e');
}

function cleanSciNot(num, maxLength) {
  // Given number in scientific notation, return string representation cleansed for calc display 
  let numStr = num.toString();
  numStr = numStr.replace('+', '');  // Convert '...e+<exp>' to '...e<exp>'
  let [coeff, exp] = numStr.split('e');
  let coeffLen = maxLength - 1 - exp.length;  // Acocunt for 'e' and exponent length
  coeff = remZeroTrail(parseFloat(coeff).toPrecision(coeffLen));
  return `${coeff}e${exp}`;

}

//---- not used:
function getENotation(num) {
  // Return string of e-notation for number (e.g. 1004 = 1.004 * 10^3 = 1.004e3)
  // Only handles ints
  num = parseInt(num);
  let e = 1;
  while (num >= 10) {
    num /= 10;
    e++;
  }
  return(`${fixFloat(num)} e${e}`);
}
