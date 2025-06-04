function validateNumberInput(inputId, errorId, minValue, maxLength, maxValue, emptyMsg, invalidMsg, maxLenMsg, maxValMsg, intOnlyMsg) {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(errorId);
  const value = input.value.trim();
  const inputValue = input.valueAsNumber;

  if (value === '') {
    input.classList.remove('input-valid');
    input.classList.add('error', 'shake');
    setTimeout(() => input.classList.remove('shake'), 300);
    errorSpan.textContent = emptyMsg;
    errorSpan.classList.add('show');
    return true;
  } else if (value.length > maxLength) {
    input.classList.remove('input-valid');
    input.classList.add('error', 'shake');
    setTimeout(() => input.classList.remove('shake'), 300);
    errorSpan.textContent = maxLenMsg;
    errorSpan.classList.add('show');
    return true;
  } else if (isNaN(inputValue) || inputValue < minValue) {
    input.classList.remove('input-valid');
    input.classList.add('error', 'shake');
    setTimeout(() => input.classList.remove('shake'), 300);
    errorSpan.textContent = invalidMsg;
    errorSpan.classList.add('show');
    return true;
  } else if (inputValue > maxValue) {
    input.classList.remove('input-valid');
    input.classList.add('error', 'shake');
    setTimeout(() => input.classList.remove('shake'), 300);
    errorSpan.textContent = maxValMsg;
    errorSpan.classList.add('show');
    return true;
  } else if (inputId === 'quantity' && !Number.isInteger(inputValue)) {
    input.classList.remove('input-valid');
    input.classList.add('error', 'shake');
    setTimeout(() => input.classList.remove('shake'), 300);
    errorSpan.textContent = intOnlyMsg;
    errorSpan.classList.add('show');
    return true;
  } else {
    input.classList.remove('error');
    input.classList.add('input-valid');
    errorSpan.textContent = '';
    errorSpan.classList.remove('show');
    return false;
  }
}

function calculateWoodResults() {
  const length = parseFloat(document.getElementById('length').value);
  const width = parseFloat(document.getElementById('width').value) / 1000; // mm -> m
  const thickness = parseFloat(document.getElementById('thickness').value) / 1000; // mm -> m
  const quantity = parseInt(document.getElementById('quantity').value);
  const pricePerM3 = parseFloat(document.getElementById('pricePerM3').value);

  const volumePerPiece = length * width * thickness;
  const totalVolume = volumePerPiece * quantity;
  const totalPrice = totalVolume * pricePerM3;

  const results = document.getElementById('results');
  results.innerHTML = `
    <p><strong>Kiekvienos lentos tūris:</strong> ${volumePerPiece.toFixed(4)} m³</p>
    <p><strong>Bendras tūris:</strong> ${totalVolume.toFixed(4)} m³</p>
    <p><strong>Bendra kaina:</strong> ${totalPrice.toFixed(2)} €</p>
  `;
}

const fields = [
  { inputId: 'length', errorId: 'error-length', min: 0.01, maxLen: 6, maxVal: 10000 },
  { inputId: 'width', errorId: 'error-width', min: 1, maxLen: 6, maxVal: 10000 },
  { inputId: 'thickness', errorId: 'error-thickness', min: 1, maxLen: 6, maxVal: 10000 },
  { inputId: 'quantity', errorId: 'error-quantity', min: 1, maxLen: 6, maxVal: 999999 },
  { inputId: 'pricePerM3', errorId: 'error-price', min: 0.01, maxLen: 6, maxVal: 999999 }
];

// Realiu laiku tikrinimas įvedant
fields.forEach(field => {
  document.getElementById(field.inputId).addEventListener('input', () => {
    validateNumberInput(
      field.inputId, field.errorId, field.min, field.maxLen, field.maxVal,
      'Laukelis negali būti tuščias!',
      `Skaičius turi būti nuo ${field.min}!`,
      `Galima įvesti daugiausiai ${field.maxLen} simbolių!`,
      `Skaičius negali būti didesnis nei ${field.maxVal}!`,
      'Leidžiami tik sveiki skaičiai!'
    );
  });
});

// Skaičiuojame paspaudus mygtuką
document.getElementById('calculate').addEventListener('click', () => {
  let hasError = false;

  fields.forEach(field => {
    const error = validateNumberInput(
      field.inputId, field.errorId, field.min, field.maxLen, field.maxVal,
      'Laukelis negali būti tuščias!',
      `Skaičius turi būti nuo ${field.min}!`,
      `Galima įvesti daugiausiai ${field.maxLen} simbolių!`,
      `Skaičius negali būti didesnis nei ${field.maxVal}!`,
      'Leidžiami tik sveiki skaičiai!'
    );
    if (error) hasError = true;
  });

  if (!hasError) {
    calculateWoodResults();
  } else {
    document.getElementById('results').innerHTML = '<p class="error">Prašome teisingai užpildyti visus laukelius.</p>';
  }
});

// Iš naujo mygtukas
document.getElementById('reset').addEventListener('click', () => {
  fields.forEach(field => {
    const input = document.getElementById(field.inputId);
    const errorSpan = document.getElementById(field.errorId);
    input.value = '0';
    input.classList.remove('error', 'input-valid');
    errorSpan.textContent = '';
    errorSpan.classList.remove('show');
  });

  document.getElementById('results').innerHTML = '<p class="error">Kol kas nieko nėra.</p>';
});
