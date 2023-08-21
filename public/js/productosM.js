document.addEventListener('DOMContentLoaded', function() {
    const btns = document.querySelectorAll('.btn-Blusas, .btn-Vestidos, .btn-Chamarras, .btn-Sudaderas,.btn-Playeras,.btn-Calzado,.btn-Sacos,.btn-Camisas,.btn-Pantalones,.btn-Bolsos,.btn-Faldas');
    const secciones = document.querySelectorAll('.seccion');

  
    btns.forEach((btn, index) => {
      btn.addEventListener('click', function() {
        secciones.forEach(seccion => {
            seccion.classList.remove('visible');
            seccion.classList.add('oculta');
        });
        secciones[index].classList.add('visible');
        secciones[index].classList.remove('oculta');
      });
    });
  });





