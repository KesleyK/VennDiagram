let currentExercise = 0;
let hintCont = 0;
const tutorMessage = $('.tutor__console--messages');
let consoleInput = $('input[name="consoleInput"]');
const btnSend = $('#btn-send');
const btnHint = $('#btn-hint');
const holderD = $('#holder');
const vennD = $('#venn');
const setValuesD = $('#set-values');
let exercisesStatment = $('p[class^="exercise-statment"');

const results = [
  '1,9',
  '(1,2),(1,3),(1,4),(4,2),(4,3),(4,4),(5,2),(5,3),(5,4),(9,2),(9,3),(9,4)',
  '4,5,6,7,8',
  '40'
]
const labels = [
  'B∩¬(A∪C)',
  'B x C',
  'Qual o valor de B?',
  'Qual percentual de gado recebeu duas etiquetas? '
]

const hints = [
  [],
  [],
  [],
  []
]

hideAllStatments();

btnSend.on('click', () => {
  if (consoleInput.val() == results[currentExercise]) {
    tutorMessage.append(`
      <p class="green-message">Parabéns! Você acertou.</p>
    `)
  } else {
    tutorMessage.append(`
      <p class="red-message">Resposta errada! Talvez seja melhor pedir ajuda.</p>
    `)
  }
});

btnHint.on('click', () => {
  if (currentExercise == 0) {
    hintExercise0(hintCont);
    hintCont++;
  } else {
    let currentHint = hints[currentExercise][hintCont];
    if (!currentHint) {
      tutorMessage.append('<p class="red-message">Nenhuma ajuda disponível.</p>');
    } else {
      tutorMessage.append(`<p class="blue-message">${currentHint}</p>`)
      hintCont++;
    }
  }
});

function hideAllStatments() {
  exercisesStatment = $('p[class^="exercise-statment"');
  exercisesStatment.hide();
  exercisesStatment.css('opacity', 1);
}

function clearConsole() {
  tutorMessage.text("");
}

function changeActiveElement(element, selectedExercise) {
  hideAllStatments();
  initializeSet();
  clearConsole();
  hintCont = 0;
  currentExercise = selectedExercise;

  checkIfDiagramIsRequired(selectedExercise);
  changeStatment(selectedExercise);

  $('.tutor__console--label').text('Resolva: ' + labels[selectedExercise]);

  $('.active').removeClass('active');
  $(element).addClass('active');
}

function checkIfDiagramIsRequired(selectedExercise) {
  if (selectedExercise > 1) {
    vennD.fadeTo("fast", 0);
    setValuesD.fadeTo("fast", 0);;
  } else {
    vennD.fadeTo("fast", 1);
    setValuesD.fadeTo("fast", 1);
  }
}

function changeStatment(selectedExercise) {
  if (selectedExercise >= 2) {
    $(`.exercise-statment--${selectedExercise}`)
      .fadeIn(200);
  } else {
    exercisesStatment.hide();
  }
}