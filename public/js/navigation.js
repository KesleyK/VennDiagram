const navigation = document.querySelector('.navigation');

window.onscroll = () => {
  if (window.pageYOffset > 30 && window.pageYOffset < 40) {
    navigation.style.background = 'rgba(173, 173, 173, .6)';
    navigation.style.position = 'relative';
  }
  else if (window.pageYOffset > 40 && window.pageYOffset < 60) {
    navigation.style.background = 'rgba(173, 173, 173, .8)';
    navigation.style.position = 'relative';
  }
  else if (window.pageYOffset >= 60) {
    navigation.style.background = 'rgba(17, 27, 39, .95)';
    navigation.style.position = 'fixed';
    navigation.style.top = 0;
  }
  else {
    navigation.style.position = 'relative';
    navigation.style.background = 'rgba(173, 173, 173, .6)';
  }
}