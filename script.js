const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Button Toggle
const toggleButton = () => {
    button.disabled = !button.disabled;
}

const tellMe = (joke) => {
    VoiceRSS.speech({
        key: '37c91acc0a6e4cda9cbdfab0215464bc',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

const getJokes = async () => {
    let joke = ''
    const api = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist';
    try {
        const response = await fetch(api);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke)
        toggleButton();
    } catch (error) {
        console.log('Error Here:', error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);