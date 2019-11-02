
// http-server ./ -p 3001
var sets = [
  {
    "sets": [0],
    "label": "A",
    "size": 500,
    "values": [2,4,5,6,8]
  },
  {
    "sets": [1],
    "label": "B",
    "size": 500,
    "values": [1,4,5,9]
  },
  {
    "sets": [2],
    "label": "C",
    "size": 500,
    "values": ['x ∈ ℤ|2 ≤ x < 5']
  }
];
let nameInput, valuesSet, interInput, sizeSetInput;
let chart = venn.VennDiagram();
let div = d3.select("#venn");
let newVal = 0;

d3.select("#venn").datum(sets).call(chart);
