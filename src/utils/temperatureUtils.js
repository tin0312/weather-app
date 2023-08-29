const kelToFah = (kelvin) => {
  return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
};

const kelToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(0);
};

const celsiusToFah = (celsius) => {
  return (parseFloat(celsius) * 1.8 + 32).toFixed(0);
};

const fahToCelsius = (fah) => {
  return (((parseFloat(fah) - 32) * 5) / 9).toFixed(0);
};

export { kelToCelsius, kelToFah, fahToCelsius, celsiusToFah };
