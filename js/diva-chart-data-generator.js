// Payoff function for call and put options (see whitepaper for more formulas)
// Note that same terminology is used for call and put options (strike, inflection, cap)
function generatePayoffFunction({
  collateralBalanceLong,
  collateralBalanceShort,
  strike,
  inflection,
  cap,
  tokenSupply,
  isLong
} = {}) {
  
  const payoffFunction = function(valueUnderlying) {  
      let beta = 0;
      let collateralBalance = 0;
      let sign = 0;

      if (isLong) {
        collateralBalance = collateralBalanceLong;
        sign = 1;
      } else {
        collateralBalance = collateralBalanceShort;
        sign = -1;
      }

      // we should probably also normalize it, i.e. not have collateralBalance as the input

      // valueUnderlying is the variable here for a given option
      if (valueUnderlying >= inflection) {
        beta = (sign * collateralBalanceShort) / (cap - inflection);
      } else {
        beta = (sign * collateralBalanceLong) / (inflection - cap);
      }
      
      const alpha = -inflection * beta;

      const payoff = 
          Math.min(
            collateralBalanceShort + collateralBalanceLong,
            Math.max(0, alpha + beta * valueUnderlying + collateralBalance)
          ) / tokenSupply;
      
      return payoff;

      // const payoffValues = {
      //   yCap: payoff(cap),
      //   yInflection: payoff(inflection),
      //   yStrike: payoff(strike)
      // }

      
  }

  return payoffFunction;
}

function generatePayoffChartData(data) {

    const payoffFunction = generatePayoffFunction(data);
    
    if (data.isLong === true) {
      const chartData = [
        {"x": data.strike * 0.9, "y": 0},
        {"x": data.strike, "y": 0},
        {"x": data.inflection, "y": payoffFunction(data.inflection)},
        {"x": data.cap, "y": payoffFunction(data.cap)},
        {"x": data.cap * 1.1, "y": payoffFunction(data.cap)}
      ]
      return chartData
    } else {
      const chartData = [
        {"x": data.strike * 1.1, "y": 0},
        {"x": data.strike, "y": 0},
        {"x": data.inflection, "y": payoffFunction(data.inflection)},
        {"x": data.cap, "y": payoffFunction(data.cap)},
        {"x": data.cap * 0.9, "y": payoffFunction(data.cap)}
      ]
      return chartData;
    }

    
}

export default generatePayoffChartData;

