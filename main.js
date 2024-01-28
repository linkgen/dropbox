let currentCorrectKey; // Make it a global variable
let errorTimeout; // Variable to store the error timeout

// Initialize the correct key
currentCorrectKey = ['pixel', 'logic', 'codec', 'cloud', 'crash', 'debug', 'stack'][(new Date().getUTCDay() + 6) % 7];

document.getElementById('link-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Clear previous errors and timeout
  clearTimeout(errorTimeout);
  clearError();

  const linkInput = document.getElementById('link-input').value;
  const keyInput = document.getElementById('link-key').value;

  // Check if the link is in the correct format
  const linkFormatRegex = /^https:\/\/www\.dropbox\.com\/scl\/fi\/.*[?&]dl=0$/;
  if (!linkFormatRegex.test(linkInput)) {
    displayError('Invalid link');
    return;
  }

  // Check if the key is correct
  if (keyInput !== currentCorrectKey) {
    displayError('Incorrect key');
    return;
  }

  // Extract the remaining link and add the desired text
  const remainingLink = linkInput.replace('https://www.dropbox.com/scl/fi/', '').replace('?dl=0', '').replace('&dl=0', '');
  const modifiedLink = window.location.origin + '/dropbox/d.html?c=' + remainingLink;

  // Display the modified link as result
  document.getElementById('convertedLink').innerText = modifiedLink;
  document.getElementById('results').style.display = 'block';
  document.getElementById('copyButton').style.display = 'block';
  document.getElementById('convert-more-button').style.display = 'block';

  // Hide the form and get key button
  document.getElementById('link-form').classList.add('hide');
  document.getElementById('getKeyButton').classList.add('hide');
});

// Additional event listener to copy the result to clipboard
document.getElementById('copyButton').addEventListener('click', function() {
  const remainingLink = document.getElementById('convertedLink').innerText;
  const tempInput = document.createElement('input');
  tempInput.value = remainingLink;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('Link copied to clipboard');
});

function displayError(message) {
  const errorBox = document.createElement('div');
  errorBox.classList.add('message-box', 'error-message');
  errorBox.innerText = message;
  document.getElementById('error-container').innerHTML = ''; // Clear previous errors
  document.getElementById('error-container').appendChild(errorBox);

  // Set a timeout to remove the error message after 3 seconds
  errorTimeout = setTimeout(() => {
    clearError();
  }, 3000);
}

function clearError() {
  const errorMessages = document.getElementsByClassName('error-message');
  while (errorMessages.length > 0) {
    errorMessages[0].parentNode.removeChild(errorMessages[0]);
  }
}

function openshrtlink() {
  // Define the mapping of keys to URLs
  const keyToURL = {
    'pixel': 'https://ilil.in/Key',
    'logic': 'https://ilil.in/Key',
    'codec': 'https://ilil.in/Key',
    'cloud': 'https://ilil.in/Key',
    'crash': 'https://ilil.in/Key',
    'debug': 'https://ilil.in/Key',
    'stack': 'https://ilil.in/Key'
  };

  // Check if the currentCorrectKey is in the mapping
  if (currentCorrectKey in keyToURL) {
    // Open the corresponding URL in a new tab/window with no referrer
    window.open(keyToURL[currentCorrectKey], '_blank', 'noreferrer');
  }
}
