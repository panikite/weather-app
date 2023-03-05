

// Time and date

let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let date = new Date();
let today = weekday[date.getDay()];
let day = document.querySelector('#day');
day.innerHTML = today;

let time = document.querySelector('#time');
let hours = date.getHours();
let minutes = date.getMinutes();  
time.innerHTML = `${hours}:${minutes}`;

//Convert units

// let celsius = document.querySelector('#celsius');
// let farenheit = document.querySelector('#farenheit');
// let currentTemp = document.querySelector('#currentTemp');


// function convertToFarenheit() {
//   if(!farenheit.classList.contains('active')) {
//        let temp = +currentTemp.innerHTML.slice(0, -1);
//    let newFarenheit = temp*1.8 + 32;
//    newFarenheit = Math.round(newFarenheit);
//    currentTemp.innerHTML = newFarenheit + '°';
//    celsius.classList.remove('active');
//    farenheit.classList.add('active');
//   }
// }

// function convertToCelisus() {
//     if(!celsius.classList.contains('active')) {
//        let temp = +currentTemp.innerHTML.slice(0, -1);
//    let newCelsius = (temp- 32) *0.5556;
//    newCelsius = Math.round(newCelsius);
//    currentTemp.innerHTML = newCelsius + '°';
//    farenheit.classList.remove('active');
//    celsius.classList.add('active');
//   }
// }

// farenheit.addEventListener('click', convertToFarenheit);
// celsius.addEventListener('click', convertToCelisus);

//API
//Show current place by GPS weather

let apiKey = '3fdc8cfbf2d6fa0116c9ae92d3df4f79';
let city = inputCity.value;
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


let currentCityButton = document.querySelector('#currentCityButton');

function showCurrentPlaceTemp() {
  navigator.geolocation.getCurrentPosition(function(result) {
    let lat = result.coords.latitude;
    let lon = result.coords.longitude;
    let coordUrl = url+`&lon=${lon}&lat=${lat}`;
    axios.get(coordUrl).then(function(response){
      let currentPlaceTemp = Math.round(response.data.main.temp);
      let currentCity = response.data.name;
      alert(`The weather in ${currentCity} is ${currentPlaceTemp}° degrees.`);
    });
  })
}

currentCityButton.addEventListener('click', showCurrentPlaceTemp);

//Show Weather of city from search

function capitalize(str) {
  let arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    let result = arr.join(" ");
    return result;
}
}

let searchForm = document.querySelector('#searchForm');

function changeCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector('#currentCity');
  let inputCity = document.querySelector('#inputCity');
  let newCity = null;
  if(inputCity.value) {
      newCity = capitalize(inputCity.value);
      currentCity.innerHTML = newCity;
  } else {
    alert('Please, choose a city');
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(url).then(function(response){
    let newTemp = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector('#currentTemp');
    currentTemp.innerHTML = `${newTemp}°`;
  })

}
searchForm.addEventListener('submit', changeCity);



