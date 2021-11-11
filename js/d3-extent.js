// Source: https://www.geeksforgeeks.org/d3-js-d3-extent-function/
// Getting minimum and maximum value from an array

// initialising the array of elements
const Array1 = [];
const Array2 = ["a", "b", "c"];
const Array3 = ["A", "B", "C"];
const Array4 = ["Geek", "Geeks", "GeeksforGeeks"];
const Array5 = [1,30,33,2];


// Calling to d3.extent() function
A = d3.extent(Array1);
B = d3.extent(Array2);
C = d3.extent(Array3);
D = d3.extent(Array4);
E = d3.extent(Array5);

// Getting minimum and maximum value
document.write(A + "<br>");
document.write(B + "<br>");
document.write(C + "<br>");
document.write(D + "<br>");
document.write(E + "<br>");