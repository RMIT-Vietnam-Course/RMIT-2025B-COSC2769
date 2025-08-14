document.getElementById("checkBtn").onclick = async function getRandomDog(e) {
    const result = document.getElementById("result");
    const startTime = Date.now();

    try {
        const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
        const data = await response.json();

        const dogImage = data.message;
        const duration = (Date.now() - startTime) / 1000;
        result.innerHTML = `Bao Ho has <img src=${dogImage} class='round-image'><br>${duration} seconds`;
        result.className = result.className === 'color-1' ? 'color-2' : 'color-1';
    } catch (error) {
        console.error('Error fetching dog image:', error);

        result.textContent = 'Error fetching dog image...';
        result.className = 'red';
    }
}