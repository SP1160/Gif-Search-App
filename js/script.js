// Paste the generated API Ket here
const apiKey = ''

const submitBnt = document.querySelector('#submit-btn')
const loader = document.querySelector('.loader')
const wrapper = document.querySelector('.wrapper')

let generateGif = () => {
  // display loader until gif load
  loader.style.display = 'block'
  wrapper.style.display = 'none'

  // Get search value (default => pekka)
  let q = document.querySelector('#search-box').value
  // We need 12 gifs to be displayed in result
  let gifCount = 12
  // API URL
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`
  wrapper.innerHTML = ''

  // Make a call of API
  fetch(finalURL)
    .then(res => res.json())
    .then(info => {
      // All gifs
      let gifsData = info.data
      gifsData.forEach(gif => {
        // Generate cards for every gifs
        let container = document.createElement('div')
        container.classList.add('container')
        let iframe = document.createElement('img')
        iframe.setAttribute('src', gif.images.downsized_medium.url)
        iframe.onload = () => {
          // if iframes has loaded correctly reduce the count when each gif loads
          gifCount--
          if (gifCount === 0) {
            // If all gifs have loaded then hide loader and display gifs UI
            loader.style.display = 'none'
            wrapper.style.display = 'grid'
          }
        }
        container.append(iframe)

        // Copy link button
        let copyBtn = document.createElement('button')
        copyBtn.innerHTML = 'Copy Link'
        copyBtn.addEventListener('click', () => {
          // Append the obtained ID to default URL
          let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`
          // Copy text inside the text field
          navigator.clipboard.writeText(copyLink)
            .then(() => console.log('GIF copied!'))
            // if navigator is not supported
            .catch(() => {
              console.log('GIF copied!')
              // create temporary input
              let hiddenInput = document.createElement('input')
              hiddenInput.setAttribute('type', 'text')
              document.body.appendChild(hiddenInput)
              hiddenInput.value = copyLink
              // Select input
              hiddenInput.select()
              // Copy the value
              document.execCommand('copy')
              // remove the input
              document.body.removeChild(hiddenInput)
            })
        })
        container.append(copyBtn)
        wrapper.append(container)
      })
    })
    .catch(() => console.log('Service dont work :('))
}

// Generate Gifs on sreeen load or when user clicks on submit
submitBnt.addEventListener('click', generateGif)
window.addEventListener('load', generateGif)