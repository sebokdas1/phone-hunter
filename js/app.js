const loadResult = () => {
    const searchInput = document.getElementById('input-field');
    const inputValue = searchInput.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => phoneResult(data.data))
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
    <div class="card h-100">
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
        .then(data => console.log(data))

}