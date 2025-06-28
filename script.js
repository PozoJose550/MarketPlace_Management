// obtener referencias
const new_post_button = document.getElementById('new_post_button');
const post_list = document.getElementById('post_list');

// ir a la página de nueva publicación
new_post_button.addEventListener('click', () => {
  window.location.href = 'new_post.html';
});

// cargar y mostrar publicaciones guardadas al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const saved_posts = JSON.parse(localStorage.getItem('posts')) || [];

  post_list.innerHTML = ''; // limpiar lista antes

  saved_posts.forEach((post, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div class="post_info">
        <strong>Nombre:</strong> ${post.saved_title}<br>
        <strong>Título:</strong> ${post.marketplace_title}<br>
        <strong>Precio:</strong> $${post.marketplace_price}<br>
        <strong>Descripción:</strong> ${post.marketplace_description}
      </div>
      <div class="post_buttons">
        <button class="copy-btn" data-index="${index}">Copiar</button>
        <button class="edit-btn" data-index="${index}">Editar</button>
        <button class="delete-btn" data-index="${index}">Eliminar</button>
      </div>
    `;

    post_list.appendChild(li);
  });

  // botones copiar
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const post = saved_posts[index];
      const textToCopy = 
`Nombre: ${post.saved_title}

Título: ${post.marketplace_title}

Precio: $${post.marketplace_price}

Descripción: ${post.marketplace_description}`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        alert('¡Texto copiado al portapapeles!');
      });
    });
  });

  // botón editar
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      localStorage.setItem('edit_post_index', index);
      window.location.href = 'new_post.html';
    });
  });

  // botón eliminar
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      saved_posts.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(saved_posts));
      location.reload();
    });
  });
});
