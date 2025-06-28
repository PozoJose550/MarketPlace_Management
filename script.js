// referencias
const newPostBtn = document.getElementById('new_post_button');
const postList = document.getElementById('post_list');

// Abrir página para nueva publicación
newPostBtn.addEventListener('click', () => {
  window.location.href = 'new_post.html';
});

// Mostrar publicaciones guardadas al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  postList.innerHTML = '';

  posts.forEach((post, index) => {
    const li = document.createElement('li');

    // Contenido con formato correcto
    li.innerHTML = `
      <p><strong>Nombre:</strong> ${post.saved_title}</p>
      <p><strong>Precio:</strong> <em style="color:#007bff;">$${post.marketplace_price}</em></p>
      <p><strong>Descripción:</strong> ${post.marketplace_description}</p>
    `;

    // Contenedor botones
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    // Botón Copiar
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copiar';
    copyBtn.addEventListener('click', () => {
      const text = 
        `Nombre: ${post.saved_title}\n\n` +
        `Precio: $${post.marketplace_price}\n\n` +
        `Descripción: ${post.marketplace_description}`;
      navigator.clipboard.writeText(text)
        .then(() => alert('Texto copiado al portapapeles'))
        .catch(() => alert('Error copiando al portapapeles'));
    });
    buttonsDiv.appendChild(copyBtn);

    // Botón Editar
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => {
      window.location.href = `new_post.html?edit=${index}`;
    });
    buttonsDiv.appendChild(editBtn);

    // Botón Eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => {
      if (confirm('¿Querés eliminar esta publicación?')) {
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        window.location.reload();
      }
    });
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(buttonsDiv);
    postList.appendChild(li);
  });
});
