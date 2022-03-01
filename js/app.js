//get search input value
const loadResult = () => {
    const searchInput = document.getElementById('input-field');
    const searchValue = searchInput.value;
    const inputValue = searchValue.toLowerCase();

    document.getElementById('phone-details').innerHTML = ''
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => phoneResult(data.data))
    searchInput.value = ''
}

//show search results
const phoneResult = phones => {
    if (phones.length == 0) {
        document.getElementById('no-result').style.display = 'block';
    } else {
        document.getElementById('no-result').style.display = 'none';
    }
    const showResult = document.getElementById('show-result')
    //clear previous result
    showResult.innerHTML = ''
    //show 1st 20 results
    for (const phone of phones.slice(0, 20)) {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
    <div class="card ">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body text-center">
        <h5 class="card-title">${phone.phone_name}</h5>
        <h6>Brand: ${phone.brand}</h6>
        <button onclick="phoneDetail('${phone.slug}')" class="btn bg-success text-white text-center">Details</button>
      </div>
    </div>
`
        showResult.appendChild(div)
    }
}

//get phone id
const phoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => singlePhones(data.data))

}

//show single phone details
const singlePhones = singlephone => {
    console.log(singlephone)
    //apply not found condition
    if (singlephone.releaseDate == '') {
        singlephone.releaseDate = 'no release date found'
    }

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <div class="card d-md-flex flex-row mx-auto mb-3">
  <div><img src="${singlephone.image}" class="card-img-top" alt="...">
  <div class="card-footer text-center text-muted">
    ${singlephone.releaseDate}
  </div></div>
  <div class="card-body">
    <h4 class="card-title class="main-property"">mainFeatures:</h4>
    <p><span class="property">chipSet: </span>${singlephone.mainFeatures.chipSet}</p>
    <p><span class="property">displaySize: </span>${singlephone.mainFeatures.displaySize}</p>
    <p><span class="property">memory: </span>${singlephone.mainFeatures.memory}</p>
    
    <h4 class="main-property">Sensonr:</h4>
    <p>${singlephone.mainFeatures?.sensors?.join(', ')}</p>
    </div>
    <div>
    <h4 class="main-property">Others:</h4>
    <p><span class="property">Bluetooth: </span>${singlephone?.others?.Bluetooth}</p>
    <p><span class="property">GPS: </span>${singlephone?.others?.GPS}</p>
    <p><span class="property">NFC: </span>${singlephone?.others?.NFC}</p>
    <p><span class="property">USB: </span>${singlephone?.others?.USB}</p>
    <p><span class="property">WLAN: </span>${singlephone?.others?.WLAN}</p>
   </div>
</div>
    `;
}