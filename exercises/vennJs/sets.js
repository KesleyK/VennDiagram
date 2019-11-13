
// http-server ./ -p 3001
var sets;
let nameInput, valuesSet, interInput, sizeSetInput;
let chart = venn.VennDiagram();
let div = d3.select("#venn");
let newVal = 0;

function initializeSet() {
  sets = [
    {
      "sets": [0],
      "label": "A",
      "size": 500,
      "values": [2, 4, 5, 6, 8]
    },
    {
      "sets": [1],
      "label": "B",
      "size": 500,
      "values": [1, 4, 5, 9]
    },
    {
      "sets": [2],
      "label": "C",
      "size": 500,
      "values": ['x ∈ ℤ|2 ≤ x < 5']
    }
  ]

  d3.select("#venn").datum(sets).call(chart);
}

initializeSet();

function hintExercise0(contHint) {
  if (contHint == 0) {
    sets.push({
      "sets": [0, 2],
      "label": "A∪C",
      "size": 500,
      "values": ['2,3,4,5,6,8']
    });
  } else if (contHint == 1) {
    sets.push(
      {
        "sets": [1, 2],
        "label": " ",
        "size": 100,
        "values": ['?']
      },
      {
        "sets": [0, 1],
        "label": "",
        "size": 100,
        "values": ['?']
      },
      {
        "sets": [0, 1, 2],
        "label": "B∩¬(A∪C)",
        "size": 100,
        "values": ['?']
      }
    );
  } else {
    sets[sets.length - 1].values = ['1,9'];
    tutorMessage.append(`
      <p class="yellow-message">Um valor foi adicionado à B∩¬(A∪C).</p>
    `)
  }
  d3.select("#venn").datum(sets).call(chart);
  getMouseEventHover();
}

d3.select("#venn").datum(sets).call(chart);
