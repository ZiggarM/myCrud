

const btn = document.querySelector('#disabledBtn')
const inputs = document.querySelectorAll('input')

btn.disabled = true

const ev = () => {
    for (let input of inputs) {
        if (input.value) {
            btn.disabled = false
        }
        else {
            btn.disabled = true
        }
    }
}


document.addEventListener('keydown', ev)

