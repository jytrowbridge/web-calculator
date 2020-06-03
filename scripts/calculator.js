import {fromSciNot} from '/scripts/sciNot.js';

export class Calculator {
  constructor () {
    this.num1 = undefined;
    this.memory = 0;
    this.operator = undefined;
    this.clearScreen = true;
    this.cumulative = true;

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

    switch (op) {
      case ('plus-minus'):
        return num *-1;
      case ('pct'):
        return num / 100;
      case ('sqrt'):
        return num**0.5;
      case ('m-plus'):
        this.memory += num;
        return num;
      case ('m-minus'):
        this.memory -= num;
        return num;
      case ('mrc'):
        console.log(this.memory)
        return this.memory;   
      case ('divide'):
      case ('multiply'):
      case ('add'):
      case ('subtract'):
        this.num1 = this.num1 != undefined && this.cumulative ? this.performOp(num) : num;
        this.operator = op;
        this.cumulative = true;
        return this.num1;
      case ('equals'):
        if (this.num1 == undefined || this.operator == undefined) return num;
        this.num1 = this.performOp(num);
        this.operator = undefined;
        this.cumulative = false;
        return this.num1;
    }
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