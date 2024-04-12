// created by SquareScreamYT
// please visit the repo to see the code

fetch('https://raw.githubusercontent.com/SquareScreamYT/aChefsDream.js/main/aChefsDream.js')
    .then(response => response.text())
    .then(code => {
        eval(code);
    })
    .catch(error => {
        console.error('Error fetching or executing code:', error);
    });
