

var blob = window.URL || window.webkitURL;
if (!blob) {
    console.log('Your browser does not support Blob URLs :(');
}


document.getElementById('file').addEventListener('change', function(event){
    const file = this.files[0];
    console.log('ssss');
    handleDrop(file);
});

function handleDrop(file) {
    const fileURL = blob.createObjectURL(file);
    const playlist = document.getElementById('playlist').innerHTML += `<li>${file.name}</li>`;
    //document.getElementById('audio').src = fileURL;
}


let dropArea = document.getElementById('drop-area');
dropArea.addEventListener('drop', (e) => handleDrop(e.dataTransfer.files[0]));


['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
});
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
});

function highlight(e) {
    dropArea.classList.add('highlight')
}
function unhighlight(e) {
    dropArea.classList.remove('highlight')
}

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}
