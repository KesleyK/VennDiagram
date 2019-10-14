
// http-server ./ -p 3001
var sets = [];
let nameInput, interInput, sizeSetInput;
let chart = venn.VennDiagram()
let div = d3.select("#venn")
let newVal = 0;

$('#btn').on('click', btn => {
  nameInput = $('input[name="nameSet"]').val();
  interInput = $('input[name="interSet"]').val();
  sizeSetInput = $('input[name="sizeSet"]').val() * 300;

  sets.push(
    {"sets": [newVal], "label": nameInput, "size": sizeSetInput},
  );

  if(interInput) {
    addIntersection(interInput, sizeSetInput);
  }
  else {
    newVal++;
  }

  d3.select("#venn").datum(sets).call(chart);
  getMouseEventHover();
});
d3.select("#venn").datum(sets).call(chart);

function addIntersection(intersectioInput){
  const intersectionValues = intersectioInput.split(',');
  let set1 = sets.filter(set => set.label == intersectionValues[0]);
  let set2 = sets.filter(set => set.label == intersectionValues[1]);

  sets.push(
    {"sets": [newVal, set1[0].sets[0]], "size": sizeSetInput / 3}
  )
  if (intersectionValues.length > 1) {
    sets.push(
      {"sets": [newVal, set2[0].sets[0]], "size": sizeSetInput / 3}
    )
    sets.push(
      {"sets": [newVal, set1[0].sets[0], set2[0].sets[0]], "size": 200}
    )
  }
  newVal++;
}