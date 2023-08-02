let apiQuotes = [];

function newQuote() {
  return apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}

function loading() {
  $(".loader").show();
  $(".quote-container").hide();
}

function loaded() {
  setTimeout(function () {
    $(".loader").hide();
    $(".quote-container").show();
  }, 200);
}

function postQuote(quote) {
  loaded();
  $("#quote").html(quote["text"]);
  if (quote["author"]) {
    $("#author").html(quote["author"]);
  } else {
    $("#author").html("Unknown");
  }

  if (quote["text"].length > 100) {
    $("#quote").addClass("long-quote");
  }
}

function tweetQuote(quote) {
  const text = $("#quote").text();
  const author = $("#author").text();
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Getting quotes
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    let quote = newQuote();
    postQuote(quote);
  } catch (error) {
    alert(error);
  }
}

getQuotes();
// loading();

$("button#new-quote").click(function () {
  getQuotes();
});

$("button#twitter").click(function (quote) {
  tweetQuote(quote);
});
