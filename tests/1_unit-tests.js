const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js'); // Pfad anpassen

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  // Test getNum für eine ganze Zahl
  test('convertHandler should correctly read a whole number input', function(done) {
    const input = "5";
    const result = convertHandler.getNum(input);
    assert.equal(result, 5);
    done();
  });

  // Test getNum für eine Dezimalzahl
  test('convertHandler should correctly read a decimal number input', function(done) {
    const input = "5.5";
    const result = convertHandler.getNum(input);
    assert.equal(result, 5.5);
    done();
  });

  // Test getNum für einen Bruch
  test('convertHandler should correctly read a fractional input', function(done) {
    const input = "3/4";
    const result = convertHandler.getNum(input);
    assert.equal(result, 0.75);
    done();
  });

  // Test getNum für einen Bruch mit Dezimalzahl
  test('convertHandler should correctly read a fractional input with a decimal', function(done) {
    const input = "3.5/4";
    const result = convertHandler.getNum(input);
    assert.equal(result, 0.875);
    done();
  });

  // Test getNum für eine doppelte Bruchzahl (Fehlerfall)
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function(done) {
    const input = "3/2/3";
    const result = convertHandler.getNum(input);
    assert.equal(result, "invalid number");
    done();
  });

  // Test getNum für den Fall, dass keine Zahl eingegeben wird (Standardwert 1)
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
    const input = "kg";
    const result = convertHandler.getNum(input);
    assert.equal(result, 1);
    done();
  });

  // Test getUnit für eine gültige Eingabeeinheit
  test('convertHandler should correctly read each valid input unit', function(done) {
    const input = "10kg";
    const result = convertHandler.getUnit(input);
    assert.equal(result, "kg");
    done();
  });

  // Test getUnit für eine ungültige Eingabeeinheit
  test('convertHandler should correctly return an error for an invalid input unit', function(done) {
    const input = "10glo";
    const result = convertHandler.getUnit(input);
    assert.equal(result, "invalid unit");
    done();
  });

  // Test getReturnUnit für eine gültige Eingabeeinheit
  test('convertHandler should correctly return the correct return unit for each valid input unit', function(done) {
    const inputUnit = "kg";
    const result = convertHandler.getReturnUnit(inputUnit);
    assert.equal(result, "lbs");
    done();
  });

  // Test getReturnUnit für eine ungültige Eingabeeinheit
  test('convertHandler should correctly return the correct return unit for each valid input unit', function(done) {
    const inputUnit = "glo";
    const result = convertHandler.getReturnUnit(inputUnit);
    assert.equal(result, null);
    done();
  });

  // Test getString für die ausgeschriebene Einheit
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(done) {
    const inputUnit = "kg";
    const result = convertHandler.getString(1, inputUnit, 2.20462, "lbs");
    assert.equal(result, "1 kilograms converts to 2.20462 pounds");
    done();
  });

  // Test für Umrechnung gal -> L
  test('convertHandler should correctly convert gal to L', function(done) {
    const result = convertHandler.convert(1, "gal");
    assert.equal(result, 3.78541);
    done();
  });

  // Test für Umrechnung L -> gal
  test('convertHandler should correctly convert L to gal', function(done) {
    const result = convertHandler.convert(1, "l");
    assert.equal(result, 0.26417);
    done();
  });

  // Test für Umrechnung mi -> km
  test('convertHandler should correctly convert mi to km', function(done) {
    const result = convertHandler.convert(1, "mi");
    assert.equal(result, 1.60934);
    done();
  });

  // Test für Umrechnung km -> mi
  test('convertHandler should correctly convert km to mi', function(done) {
    const result = convertHandler.convert(1, "km");
    assert.equal(result, 0.62137);
    done();
  });

  // Test für Umrechnung lbs -> kg
  test('convertHandler should correctly convert lbs to kg', function(done) {
    const result = convertHandler.convert(1, "lbs");
    assert.equal(result, 0.45359);
    done();
  });

  // Test für Umrechnung kg -> lbs
  test('convertHandler should correctly convert kg to lbs', function(done) {
    const result = convertHandler.convert(1, "kg");
    assert.equal(result, 2.20462);
    done();
  });

});