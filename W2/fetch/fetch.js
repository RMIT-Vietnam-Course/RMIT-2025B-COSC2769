function fetchUsingPromise() {
    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => console.log('Cat Fact (Promise):', data.fact))
        .catch(error => console.error('Error fetching cat fact using Promise:', error));
}

async function fetchUsingAsyncAwait() {
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        console.log('Cat Fact (Async/Await):', data.fact);
    } catch (error) {
        console.error('Error fetching cat fact using Async/Await:', error);
    }
}

fetchUsingPromise();
fetchUsingAsyncAwait();