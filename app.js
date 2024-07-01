document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("get_random_quotes")
    .addEventListener("click", (e) => {
      e.preventDefault();
      getRandomQuotes();
    });

    document.getElementById('copy_clipboard').addEventListener('click', (e)=>{
        e.preventDefault();
        copyToClipboard();
    })
});

const getRandomQuotes = () => {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      
      const quotes_content = document.getElementById('quotes_content');
      quotes_content.innerText = `“${data.content}”`;

      const author_name = document.getElementById('author_name');
      author_name.innerText = data.author;
      const categories = document.getElementById('categories');
      categories.replaceChildren();// to remove all child
      
      data.tags.forEach(tag_data => {
          const tag = document.createElement('button');
          tag.innerText = tag_data;
          categories.appendChild(tag);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const copyToClipboard = ()=>{
    const quotes_content = document.getElementById('quotes_content');
    navigator.clipboard.writeText(quotes_content.innerText);
    
    Toastify({
        text: "the quote copied to clipboard.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}
