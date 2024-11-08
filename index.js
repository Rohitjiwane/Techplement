
// // Array of quotes
// const quotes = [
//     { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
//     { text: "Never tell the truth to people who are not worthy of it.", author: "Mark Twain" },
//     { text: "To avoid criticism, do nothing, say nothing, and be nothing.", author: "Aristotle" },
//     { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
//     { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
//     { text: "Everything has its beauty, but not everyone sees it.", author: "Andy Warhol" },
//     { text: "If you are going through hell, keep going.", author: "Winston S. Churchill" },
//     { text: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney" }
//   ];

//   // Function to generate a random quote
//   function generateQuote() {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const quote = quotes[randomIndex];
//     document.getElementById("quote").textContent = `"${quote.text}"`;
//     document.getElementById("author").textContent = `- ${quote.author}`;
//   }


// Fetch and display a random quote
async function generateQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    document.getElementById("quote").textContent = `"${data.content}"`;
    document.getElementById("author").textContent = `- ${data.author}`;
  } catch (error) {
    document.getElementById("quote").textContent = "Failed to fetch a new quote.";
    document.getElementById("author").textContent = "";
  }
}



// Fetch and display quotes by a specific author
async function searchQuotesByAuthor() {
  const author = document.getElementById("author_name").value.trim();
  const resultsContainer = document.getElementById("search_results");
  resultsContainer.innerHTML = ""; // Clear previous results
  
  if (!author) {
    resultsContainer.innerHTML = `<p style="color: #888; text-align: center;">Please check the author name.</p>`;
    return;
  }
  
  try {
    const response = await fetch(`https://api.quotable.io/quotes?author=${author}`);
    const data = await response.json();
  
    if (data.results.length > 0) {
      data.results.forEach(quote => {
        const quoteElement = document.createElement("div");
        quoteElement.className = "quote-result";
        quoteElement.innerHTML = `
          <p style="margin-top: 10px;">"${quote.content}"</p>
          <p style="padding: 10px;">- ${quote.author}</p>
        `;
        resultsContainer.appendChild(quoteElement);
      });
    } else {
      resultsContainer.innerHTML = `<p>No quotes found for "${author}".</p>`;
    }
  } catch (error) {
    resultsContainer.innerHTML = "<p>Failed to load quotes. Please try again.</p>";
  }
}
  
// Fetch a random quote when the page loads
window.onload = generateQuote;