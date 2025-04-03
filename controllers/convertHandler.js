function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
  
    const regex = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?([a-zA-Z]+)?$/;
    const match = input.match(regex);
  
    if (match) {
      let numPart = match[1];
      const unitPart = match[5];
  
      if (numPart) {
        if (numPart.includes('/')) {
          const parts = numPart.split('/');
          
          if (parts.length > 2) {
            result = "invalid number";
          } else {
            const numerator = parseFloat(parts[0]);
            const denominator = parseFloat(parts[1]);
            if (isNaN(numerator) || isNaN(denominator)) {
              result = "invalid number";
            } else {
              result = numerator / denominator;
            }
          }
        } else {
          result = parseFloat(numPart);
        }
      } else {
        result = 1;
      }
      
      if (isNaN(result)) {
        result = "invalid number";
      }
    } else {
      result = "invalid number";
    }
  
    return result;
  };
  
  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);

    if (match) {
        let unit = match[0].toLowerCase();

        const validUnits = ['gal', 'gallon', 'gallons', 'l', 'liter', 'liters', 'mi', 'mile', 'miles', 'km', 'kilometer', 'kilometers', 'lbs', 'pound', 'pounds', 'kg', 'kilogram', 'kilograms'];

        if (validUnits.includes(unit)) {
            return unit === 'l' ? 'L' : unit;
        }
    }

    return "invalid unit";
};
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
        'gal': 'L', 'gallon': 'L', 'gallons': 'L',
        'L': 'gal', 'liter': 'gal', 'liters': 'gal',
        'mi': 'km', 'mile': 'km', 'miles': 'km',
        'km': 'mi', 'kilometer': 'mi', 'kilometers': 'mi',
        'lbs': 'kg', 'pound': 'kg', 'pounds': 'kg',
        'kg': 'lbs', 'kilogram': 'lbs', 'kilograms': 'lbs'
    };

    return unitMap[initUnit] || null;
};

  this.spellOutUnit = function(unit) {
    let result;
    const unitNames = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    };

    result = unitNames[unit] || null;
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const LToGal = 1 / galToL;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;

    if (initUnit === 'gal' || initUnit === 'gallon' || initUnit === 'gallons') {
        result = initNum * galToL;
    } else if (initUnit === 'L') {
        result = initNum * LToGal;
    } else if (initUnit === 'mi' || initUnit === 'mile' || initUnit === 'miles') {
        result = initNum * miToKm;
    } else if (initUnit === 'km' || initUnit === 'kilometer' || initUnit === 'kilometers') {
        result = initNum / miToKm;
    } else if (initUnit === 'lbs' || initUnit === 'pound' || initUnit === 'pounds') {
        result = initNum * lbsToKg;
    } else if (initUnit === 'kg' || initUnit === 'kilogram' || initUnit === 'kilograms') {
        result = initNum / lbsToKg;
    } else {
        return undefined;
    }

    return parseFloat(result.toFixed(5));
};
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const unitNames = {
      'gal': 'gallons', 'gallon': 'gallons', 'gallons': 'gallons',
      "l": "L", "liter": "L", "liters": "L",
      'mi': 'miles', 'mile': 'miles', 'miles': 'miles',
      'km': 'kilometers', 'kilometer': 'kilometers', 'kilometers': 'kilometers',
      'lbs': 'pounds', 'pound': 'pounds', 'pounds': 'pounds',
      'kg': 'kilograms', 'kilogram': 'kilograms', 'kilograms': 'kilograms'
    };
  
    if (initNum === "invalid number"){
      return "invalid number";
    } else if (initUnit === "invalid unit") {
      return "invalid unit";
    }

    return `${initNum} ${unitNames[initUnit] || initUnit} converts to ${returnNum} ${unitNames[returnUnit] || returnUnit}`;
  };
  
}

module.exports = ConvertHandler;