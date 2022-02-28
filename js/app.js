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
    //apply not found condition
    if (singlephone.releaseDate == '') {
        singlephone.releaseDate = 'no release date found'
    }
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <div class="card" style="width: 18rem;">
  <img src="${singlephone.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h6 class="card-title">mainFeatures:</h6>
    <p>chipSet: ${singlephone.mainFeatures.chipSet}</p>
    <p>displaySize: ${singlephone.mainFeatures.displaySize}</p>
    <p>memory: ${singlephone.mainFeatures.memory}</p>
    <div class="card-footer text-muted">
    ${singlephone.releaseDate}
  </div>
     </div>
</div>
    `;
}