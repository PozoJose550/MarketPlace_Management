document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('post_characteristics');
  const inputImages = document.getElementById('marketplace_images');
  const btnSelectImages = document.getElementById('btn_select_images');
  const btnCancel = document.getElementById('cancel_button');

  // Cuando clickean el botón, abrir input oculto
  btnSelectImages.addEventListener('click', () => {
    inputImages.click();
  });

  // Al enviar formulario, guardar en localStorage y volver al hub
  form.addEventListener('submit', event => {
    event.preventDefault();

    const saved_title = document.getElementById('saved_title').value.trim();
    const marketplace_title = document.getElementById('marketplace_title').value.trim();
    const marketplace_price = document.getElementById('marketplace_price').value.trim();
    const marketplace_description = document.getElementById('marketplace_description').value.trim();

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    const newPost = {
      saved_title,
      marketplace_title,
      marketplace_price,
      marketplace_description,
    };

    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    window.location.href = 'index.html';
  });

  // Botón cancelar vuelve al hub
  btnCancel.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
