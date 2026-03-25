// joke-script.js

// Function to fetch a joke from JokeAPI
async function fetchJoke(safeMode = false) {
    const url = safeMode ? 'https://v2.jokeapi.dev/joke/Programming?safe-mode' : 'https://v2.jokeapi.dev/joke/Programming';
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.joke) {
            return data.joke; // when joke is a single joke
        } else if (data.setup && data.delivery) {
            return `${data.setup} - ${data.delivery}`; // when joke has setup and delivery
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        return 'Failed to fetch joke.';
    }
}

// Function to display a joke
async function displayJoke(safeMode) {
    const joke = await fetchJoke(safeMode);
    document.getElementById('jokeDisplay').innerText = joke;
}

// Function to share the joke
function shareJoke(joke) {
    if (navigator.share) {
        navigator.share({
            title: 'Joke to share',
            text: joke,
            url: document.URL,
        })
        .then(() => console.log('Joke shared successfully!'))
        .catch(error => console.error('Error sharing joke:', error));
    } else {
        alert('Sharing is not supported on this browser.');
    }
}

// Example usage:
// document.getElementById('fetchJokeButton').onclick = () => displayJoke(true); // Pass 'true' for safe mode
// document.getElementById('shareButton').onclick = () => shareJoke(document.getElementById('jokeDisplay').innerText);