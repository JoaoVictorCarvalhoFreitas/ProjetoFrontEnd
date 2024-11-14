document.addEventListener("DOMContentLoaded", function(event) {
    function getUsuarios() {
        fetch('/usuarios')
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector('tbody');
                tbody.innerHTML = '';
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.nome}</td>
                        <td>${user.email}</td>
                        <td>${user.senha}</td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => console.log(error));
        }
    getUsuarios();
});