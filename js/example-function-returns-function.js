function generateLinearFunction(a,b) {
    // const f = (x) => a + b*x; // short notation
    const f = function(x) {      // long notation
        a + b*x;
    } 
    return f;
}

const y = generateLinearFunction(1,2);
console.log("f(0) = " + y(0)) // expected output: 1
console.log("f(1) = " + y(1)) // expected output: 3