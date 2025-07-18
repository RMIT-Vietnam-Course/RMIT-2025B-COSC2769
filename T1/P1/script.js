document.getElementById("checkBtn").onclick = async function checkGender(e) {
    const result = document.getElementById("result");
    const firstNameInput = document.getElementById('firstNameInput');
    const firstName = firstNameInput.value.trim();

    try {
        const response = await fetch(`https://api.genderize.io/?name=${firstName}`);
        const data = await response.json();

        const gender = data.gender;
        result.textContent = `${firstName}: ${gender}`;
        result.className = gender === 'male' ? 'blue' : 'pink';

        firstNameInput.value = '';
        firstNameInput.focus();
    } catch (error) {
        console.error('Error fetching gender:', error);

        result.textContent = 'Error fetching gender data...';
        result.className = 'red';
    }
}