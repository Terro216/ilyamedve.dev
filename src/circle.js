document.addEventListener('DOMContentLoaded', lettering)

function lettering() {
	const circle = document.querySelector('.circle')
	const textContent = circle.textContent
	const letters = textContent.split('')
	circle.textContent = ''

	//alert(letters.length - 1)

	letters.forEach((letter, index) => {
		const span = document.createElement('span')
		span.textContent = letter
		span.classList.add(`letter-${letters.length - 1 - index}`)
		circle.append(span)
	})

	animateCircle()
}

function animateCircle() {}
