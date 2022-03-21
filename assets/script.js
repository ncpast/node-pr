document.getElementById('submit').addEventListener('click', () => {
    const xhr = new XMLHttpRequest;
    xhr.open('POST', 'http://localhost:3000/data');
    xhr.onload = function() {
        console.log('DONE: ', xhr.status);
    };
    xhr.setRequestHeader('title', document.getElementById('title').value);
    xhr.setRequestHeader('user', document.getElementById('username').value);
    xhr.setRequestHeader('content', document.getElementById('content').value);
    xhr.send();

    location.reload();
});

$(document).ready(function() {
    const xhr = new XMLHttpRequest;
    xhr.open('GET', 'http://localhost:3000/data');
    xhr.onload = function() {
        const rdata = JSON.parse(xhr.responseText);
        parseData(rdata);
    };
    xhr.send();
});

function parseData(data) {
    data.forEach((item) => {
        $('#data').append(`
            <div class="data-elem">
                <h1>${item.title}</h1>
                <h4>ID: ${item.id}</h4>
                <h4>Post by: ${item.user}</h4>
                <p>${item.content}</p>
            </div>
        `);
    });
};