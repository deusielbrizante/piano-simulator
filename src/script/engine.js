//lista de todas as teclas a serem usadas
let mapedKeys = []

//variável de inicialização do áudio
let audio = new Audio("../src/tunes/a.wav")

//variável de verificação para ver se as teclas podem exibir as letras ou não
const keysCheck = document.querySelector(".keys-check input")

//lista de todas as teclas do piano que estão na página
const pianoKeys = document.querySelectorAll(".piano-keys .key")

//variável do slider para controlar o som
const volumeSlider = document.querySelector(".volume-slider input")

//função para executar o áudio da tecla pressionada
const playTune = (key) => {
    //atualiza para o áudio que foi pressionado e ativa o som dele
    audio.src = `../src/tunes/${key}.wav`
    audio.play()

    //variável local para verificar qual tecla foi clicada
    const clickedKey = document.querySelector(`[data-key="${key}"]`)

    //instancia a classe "active" para a tecla que foi clicada e a remove depois de 150ms
    clickedKey.classList.add("active")
    setTimeout(() => {
        clickedKey.classList.remove("active")
    }, 150)
}

//variáveç para atualizar o som baseado no slider
const handleVolume = (event) => {
    audio.volume = event.target.value
}

//ativa e desativa a classe hide que faz aparecer e desaparecer as letras das teclas
const showHideKeys = () => pianoKeys.forEach(key => key.classList.toggle("hide"))

//adição do evento click nas teclas que podem ser pressionadas e adição das letras na lista de teclas mapeadas
pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key))
    mapedKeys.push(key.dataset.key)
})

//adição do evento de keydown para as teclas pressionadas pelo teclado
document.addEventListener("keydown", (event) => {
    //verifica se a tecla pressionada está dentro da lista para tocar o som
    if (mapedKeys.includes(event.key)) {
        playTune(event.key)
    }
})

//adição do evento de input do slider do volume
volumeSlider.addEventListener("input", handleVolume)

//adição do evento de click no botão que faz as letras aparecerem e desaparecerem
keysCheck.addEventListener("click", showHideKeys)