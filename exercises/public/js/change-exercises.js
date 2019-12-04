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
const modalExercise2 = $('#modal-exercise2');
const modalExercise2Img = $('.modal-exercise2__img');
const btnCloseModal2 = $('.btn-closeModal2');

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
  [
    'sets-A.png',
    'sets-B.png',
    'sets-Intersect.png'
  ],
  [
    '(80-x) +x + (60-x) = 100',
    '140 -2x +x = 100',
    '-x = 100 - 140',
    '-x = -40',
    'x = 40'
  ]
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
  } else if (currentExercise == 2) {
    modalExercise2.show();
    addImgToModal2();
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

btnCloseModal2.on('click', () => {
  modalExercise2.addClass('invisible');
});

function hideAllStatments() {
  modalExercise2.hide();
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
  modalExercise2.addClass('invisible');
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
      modalExercise2.hide();
  } else {
    exercisesStatment.hide();
  }
}

function addImgToModal2() {
  if (hints[currentExercise][hintCont]) {
    modalExercise2.removeClass('invisible');
    modalExercise2Img.attr('src', './public/img/' + hints[currentExercise][hintCont]);
  } else {
    tutorMessage.append('<p class="red-message">Nenhuma ajuda disponível.</p>');
  }
}
