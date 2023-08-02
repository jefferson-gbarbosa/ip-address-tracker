const keyApi = 'at_ijSkg0RU2Nckek83oYRBOBxxynTMT';

const ipInput = document.querySelector('#input-ip');
const searchBtn = document.querySelector('#search-btn');
const ipValue = document.querySelector('#ipValue');
const locationValue = document.querySelector('#locationValue');
const timeValue = document.querySelector('#timeValue');
const ispValue = document.querySelector('#ispValue');
const modalError = document.querySelector('#modal-error');
const errorTxt = document.querySelector('#error-txt');
const closeBtn = document.querySelector('#close-btn');

let lon;
let lat;

const loaderData = async() =>{
    const url =`https://geo.ipify.org/api/v2/country,city?apiKey=${keyApi}`;
    const res = await fetch(url);
    const data = await res.json();
    
    ipValue.textContent = data.ip;
    locationValue.textContent = `${data.location.country},${data.location.region}, ${data.location.city}${data.location.postalCode}`
    timeValue.textContent = `UTC ${data.location.timezone}`;
    ispValue.textContent = data.isp;
    lat = data.location.lat;
	lon = data.location.lng
    mapLocation(lat, lon);
    console.log(data)
}

loaderData();

const getIpifyData = async(ipAddress) =>{
    const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${keyApi}&ipAddress=${ipAddress}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
const showIpData = async(ipAdressInput) =>{
    const data = await getIpifyData(ipAdressInput);
    ipValue.textContent = data.ip;
    locationValue.textContent = `${data.location.country},${data.location.region}, ${data.location.city}${data.location.postalCode}`
    timeValue.textContent = `UTC ${data.location.timezone}`;
    ispValue.textContent = data.isp;
    lat = data.location.lat;
	lon = data.location.lng
    ipValue.value ='';  
    mapLocation(lat, lon);
}
//Map
let map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

const mapLocation = (lat, lon) => {
    var markerIcon = L.icon({
      iconUrl: 'images/icon-location.svg',
      iconSize: [46, 56], 
      iconAnchor: [23, 55],
    })
    map.setView([lat, lon], 17)
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
    }).addTo(map);
  
    L.marker([lat, lon], { icon: markerIcon }).addTo(map)
}

searchBtn.addEventListener('click',async(e) => {
    e.preventDefault();
    if(ipInput.value.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,)) {
        showIpData(ipInput.value);
    }else{
        // alert('You have entered an invalid IP address!')
        errorModal();
        return false
    } 
})

ipInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      showIpData(ipInput.value);
    }
});

const errorModal = ()=>{
    modalError.style.display = 'block';
    errorTxt.textContent = 'You have entered an invalid IP address!'
}

closeBtn.addEventListener('click', () => {
    modalError.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modalError) {
        modalError.style.display = 'none';
    }
});
