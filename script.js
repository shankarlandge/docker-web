const texts = ["Shankar 👨‍💻", "a Cloud Engineer ☁️", "a Docker Enthusiast 🐳"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  document.getElementById('typed-text').textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1500);
  } else {
    setTimeout(type, 150);
  }
}

function changeColor() {
  document.body.style.background = 'linear-gradient(to right, #0f2027, #203a43, #2c5364)';
}

type();
