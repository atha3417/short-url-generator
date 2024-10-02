const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/shorten');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            if (res.error) {
                Swal.fire(
                    'Error!',
                    res.error,
                    'error'
                );
            } else {
                Swal.fire(
                    'Success!',
                    res.success,
                    'success'
                );
                document.getElementById('url').value = '';
                document.getElementById('short').value = '';
            }
        }
    }
    const data = {
        url: document.getElementById('url').value,
        short: document.getElementById('short').value
    };
    xhr.send(JSON.stringify(data));
    e.preventDefault();
});