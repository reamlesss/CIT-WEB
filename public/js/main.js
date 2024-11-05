alert("js");

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://3.72.14.70:3000/posts")
    .then((response) => response.json())
    .then((posts) => {
      const postsContainer = document.getElementById("posts");
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <small>${new Date(post.created_at).toLocaleDateString()}</small>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));
});
