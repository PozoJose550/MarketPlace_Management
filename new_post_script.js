// Referencias a elementos
const form = document.getElementById('post_characteristics');
const cancel_button = document.getElementById('cancel_button');

// Chequear si venimos a editar una publicación
const editIndex = localStorage.getItem('edit_post_index');

// Cargar datos si estamos editando
function loadPostForEdit() {
  if (editIndex !== null) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[editIndex];
    if (post) {
      document.getElementById('saved_title').value = post.saved_title;
      document.getElementById('marketplace_title').value = post.marketplace_title;
      document.getElementById('marketplace_price').value = post.marketplace_price;
      document.getElementById('marketplace_description').value = post.marketplace_description;
      // Si querés manejar imágenes, requiere código extra
    }
  }
}
loadPostForEdit();

// Manejar envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();

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

  if (editIndex !== null) {
    posts[editIndex] = newPost; // Actualizar publicación editada
    localStorage.removeItem('edit_post_index');
  } else {
    posts.push(newPost); // Añadir publicación nueva
  }

  localStorage.setItem('posts', JSON.stringify(posts));

  // Volver al hub
  window.location.href = 'index.html';
});

// Botón cancelar vuelve al hub sin guardar
cancel_button.addEventListener('click', () => {
  localStorage.removeItem('edit_post_index'); // Limpiar si había edición
  window.location.href = 'index.html';
});
