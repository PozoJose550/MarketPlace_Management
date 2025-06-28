// Función para obtener el índice de edición desde la URL
function getEditIndex() {
  const params = new URLSearchParams(window.location.search);
  return params.has('edit') ? Number(params.get('edit')) : null;
}

document.addEventListener('DOMContentLoaded', () => {
  const editIndex = getEditIndex();
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  // Referencias a inputs y botones
  const form = document.getElementById('post_characteristics');
  const cancelBtn = document.getElementById('cancel_button');
  const btnSelectImages = document.getElementById('btn_select_images');
  const inputImages = document.getElementById('marketplace_images');

  // Si venís a editar, cargar los datos al formulario
  if (editIndex !== null && posts[editIndex]) {
    const post = posts[editIndex];
    document.getElementById('saved_title').value = post.saved_title;
    document.getElementById('marketplace_title').value = post.marketplace_title;
    document.getElementById('marketplace_price').value = post.marketplace_price;
    document.getElementById('marketplace_description').value = post.marketplace_description;
    // Si querés agregar imágenes, acá las podés cargar también
  }

  // Botón para abrir selector de imágenes oculto
  btnSelectImages.addEventListener('click', () => {
    inputImages.click();
  });

  // Guardar post (nuevo o editado)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const saved_title = document.getElementById('saved_title').value.trim();
    const marketplace_title = document.getElementById('marketplace_title').value.trim();
    const marketplace_price = document.getElementById('marketplace_price').value.trim();
    const marketplace_description = document.getElementById('marketplace_description').value.trim();

    const newPost = {
      saved_title,
      marketplace_title,
      marketplace_price,
      marketplace_description,
      // Agregar imágenes si querés
    };

    if (editIndex !== null && posts[editIndex]) {
      posts[editIndex] = newPost;  // actualizar
    } else {
      posts.push(newPost);          // nuevo
    }

    localStorage.setItem('posts', JSON.stringify(posts));

    // Volver al hub
    window.location.href = 'index.html';
  });

  // Cancelar vuelve al hub sin guardar
  cancelBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
