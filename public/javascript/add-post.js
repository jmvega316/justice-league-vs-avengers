async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const contents = document.querySelector('textarea[name="post-content"]').value.trim();

  if  (title && contents) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        contents
      }),
      headers: {
        'Content-Type': 'application/json'
    }
  });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("Failed to create a post. Please try again!");
    }
  }
}
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
