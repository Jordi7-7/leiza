document.addEventListener('DOMContentLoaded', function() {
    const btns = document.querySelectorAll('.btn-Sudaderas, .btn-Playeras, .btn-Tennis, .btn-Chamarras, .btn-Camisas,.btn-Pantalones');
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