document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            event.preventDefault(); // Evita el salto predeterminado
            targetElement.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
        }
    });
});
