function lettering() {
  const circle = document.querySelector('.circle')
  if (!circle) return
  const textContent = circle.textContent
  const letters = textContent?.split('')
  circle.textContent = ''

  //alert(letters.length - 1)

  letters?.forEach((letter, index) => {
    const span = document.createElement('span')
    span.textContent = letter
    span.classList.add(`letter-${letters.length - 1 - index}`)
    circle.append(span)
  })

  // let mewidth = document.querySelector('.me')?.offsetWidth
  // if (!mewidth) return
  // if (window.innerWidth <= mobileBreakPoint) mewidth = Math.floor(mewidth * 0.4)
  // else mewidth -= 50

  // const radius = Math.min(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2))
  // document.querySelector('.circle')?.style.setProperty('--radius', radius + 'px')

  animateCircle()
}

lettering()

function animateCircle() {}
