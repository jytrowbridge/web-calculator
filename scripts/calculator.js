import {fromSciNot} from './sciNot.js';

export class Calculator {
  constructor () {
    this.num1 = undefined;
    this.memory = 0;
    this.operator = undefined;
    this.clearScreen = true;
    this.cumulative = true;
    this.prevIsOp = false;
    this.operations = ['add', 'divide', 'subtract', 'multiply']
  }

  computeOp (num, op) {
    /*Given [num, op], update attributes if necessary and return the result.
      Parameters:
        num: the first number to be operated on
        op: the operation to be performed, represented by a string. Acceptable values and their return values:
          plus-minus  :   switch the sign of the num
          pct         :   return num represented as a percentage 
          sqrt        :   return the square root base 2 of num
          mrc         :   return this.memory
          m-plus      :   add num to this.memory
                            returns num (this is what should be displayed on screen)
          m-minus     :   subtract num from this.memory
                            returns num
          divide      :   save 'divide' in this.operator and num in this.num1
                            returns num
          multiply    :   save 'multiply' in this.operator and num in this.num1
                            returns num
          add         :   save 'add' in this.operator and num in this.num1
                            returns num
          subtract    :   save 'subtract' in this.operator and num in this.num1
                            returns num
          equals      :   perform operation saved in this.operator to num and this.num1
                            returns result of operation
      
      Returns:
        See above
    */
    // convert number from scientific notation
    num = fromSciNot(num); 
    let returnVal;

    switch (op) {
      case ('plus-minus'):
        returnVal = num *-1;
        break;
      case ('pct'):
        returnVal = num / 100;
        break;
      case ('sqrt'):
        returnVal = num**0.5;
        break;
      case ('m-plus'):
        this.memory += num;
        returnVal = num;
        break;
      case ('m-minus'):
        this.memory -= num;
        returnVal = num;
        break;
      case ('mrc'):
        returnVal = this.memory;   
        break;
      case ('divide'):
      case ('multiply'):
      case ('add'):
      case ('subtract'):
        this.num1 = this.num1 != undefined && this.cumulative && !this.prevIsOp ? this.performOp(num) : num;
        this.operator = op;
        this.cumulative = true;
        returnVal = this.num1;
        break;
      case ('equals'):
        if (this.num1 == undefined || this.operator == undefined) return num;
        this.num1 = this.performOp(num);
        this.operator = undefined;
        this.cumulative = false;
        returnVal = this.num1;
        break;
    }
    this.prevIsOp = this.operations.includes(op);
    return returnVal;
  }

  performOp(num) {
    switch (this.operator) {
      case ('divide'):
        return this.num1 / num; // can maybe just apply parsefloat and toprecision
      case ('multiply'):
        return this.num1 * num;
      case ('add'):
        return this.num1 + num;
      case ('subtract'):
        return this.num1 - num;
    }
  }

}