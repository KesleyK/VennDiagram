
// http-server ./ -p 3001
var sets = [];
let nameInput, valuesSet, interInput, sizeSetInput;
let chart = venn.VennDiagram();
let div = d3.select("#venn");
let newVal = 0;

$('#btn').on('click', btn => {
  nameInput = $('input[name="nameSet"]').val();
  valuesSet = $('input[name="valuesSet"]').val();
  interInput = $('input[name="interSet"]').val();
  sizeSetInput = $('input[name="sizeSet"]').val() * 300;
  console.log(sets, newVal);

  const checkIfSetExist = sets.find(set => {
    return set.label == nameInput;
  });

  if (checkIfSetExist) {
    return addErrorMessage('Conjunto já existente.');
  }

  sets.push(
    {
      "sets": [newVal],
      "label": nameInput,
      "size": sizeSetInput,
      "values": valuesSet.split(',')
    }
  );

  if (interInput) {
    addIntersection(interInput, sizeSetInput);
  } else {
    newVal++;
  }

  d3.select("#venn").datum(sets).call(chart);
  getMouseEventHover();
});

d3.select("#venn").datum(sets).call(chart);

function addIntersection(intersectioInput) {
  const intersectionValues = intersectioInput.split(',');
  const set1 = sets.filter(set => set.label == intersectionValues[0]);
  const set2 = sets.filter(set => set.label == intersectionValues[1]);
  const verifc1 = intersectionValues.length > 1 && (!set1.length > 0 || !set2.length > 0);
  const verifc2 = intersectionValues.length == 1 && !set1.length > 0;

  if (verifc1 || verifc2) {
    sets.pop();
    return addErrorMessage('Os conjuntos de interseção devem existir');
  }

  sets.push(
    {
      "sets": [newVal, set1[0].sets[0]],
      "size": sizeSetInput / 3,
      "label": sets[newVal].label + '∩' + set1[0].label,
      "values": bindIntersection(sets[newVal], set1[0])
    }
  );

  if (intersectionValues.length > 1) {
    sets.push(
      {
        "sets": [newVal, set2[0].sets[0]],
        "size": sizeSetInput / 3,
        "label": sets[newVal].label + '∩' + set2[0].label,
        "values": bindIntersection(sets[newVal], set2[0])
      }
    );

    let bindedIntersection = { values: bindIntersection(sets[newVal], set1[0]) };
    sets.push(
      {
        "sets": [newVal, set1[0].sets[0], set2[0].sets[0]],
        "size": 200,
        "label": sets[newVal].label + '∩' + set1[0].label + '∩' + set2[0].label,
        "values":
          bindIntersection(bindedIntersection, set2[0])
      }
    );
  }
  newVal = sets.length;
}

function addErrorMessage(message) {
  $('#criar-diagrama .diagram__input-area').append(`<p>Erro: ${message}</p>`);
}

function bindIntersection(set1, set2) {
  const set1Values = set1.values;
  const set2Values = set2.values;
  const intersect = [];

  set1Values.forEach(element => {
    set2Values.forEach(elem => {
      if (elem == element) {
        intersect.push(element);
      }
    });
  });
  return intersect;
}
