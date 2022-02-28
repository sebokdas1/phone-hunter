const loadResult = () => {
    const searchInput = document.getElementById('input-field');
    const searchValue = searchInput.value;
    const inputValue = searchValue.toLowerCase();
    // console.log(inputValue)
    document.getElementById('phone-details').innerHTML = ''
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => phoneResult(data.data))
    searchInput.value = ''
}
const phoneResult = phones => {
    // console.log(phones)
    const showResult = document.getElementById('show-result')
    showResult.innerHTML = ''
    for (const phone of phones) {
        // console.log(phone)

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

const phoneDetail = id => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => singlePhone(data.data))

}
const singlePhone = single => {
    console.log(single)
    const phoneDetails = document.getElementById('phone-details');

    phoneDetails.innerHTML = `
    <div class="card" style="width: 18rem;">
  <img src="${single.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h6 class="card-title">mainFeatures:</h6>
    <p>chipSet: ${single.mainFeatures.chipSet}</p>
    <p>displaySize: ${single.mainFeatures.displaySize}</p>
    <p>memory: ${single.mainFeatures.memory}</p>
    <div class="card-footer text-muted">
    ${single.releaseDate}
  </div>
     </div>
</div>
    `
}