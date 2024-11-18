const galleryImages = document.querySelectorAll('.example img');
const popupCloseButton = document.querySelector('#ipClose');
const popupImageLink = document.querySelector('#ipImageLink');
const popup = document.querySelector('#imagePopup')
const popupContent = document.querySelector('#popupContent')

popupCloseButton.addEventListener('click', () => {
    popup.close()
  })
  
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      popupContent.innerHTML = `<img src="${img.src}" id="popupImage">`
      popupImageLink.setAttribute('href', img.src)
      popupImageLink.textContent = img.src.substring(img.src.lastIndexOf('/') + 1)
      popup.showModal()
    })
  })