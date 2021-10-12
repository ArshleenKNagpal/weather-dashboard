let ApiKey = 'a5f1951d920262d2e977eef2129fc60f';
let fiveDayApiKey = '2b5c6242956ebaa4aa9ab9ed8dec6cbb';
let nameInputEl = document.querySelector('#search');
let userFormEl = document.querySelector('#user-form');
let oldCityContainerEl = document.querySelector('#old-cities-container');
let cityContainerEl = document.querySelector('#city-container');
let fiveCityContainerEl = document.querySelector('#city-container-2');
let fiveDayTitleEl = document.querySelector('#five-day-forecast');

let day1 = document.querySelector("#day1");
let day2 = document.querySelector("#day2");
let day3 = document.querySelector("#day3");
let day4 = document.querySelector("#day4");
let day5 = document.querySelector("#day5");


let formSubmitHandler = function (event) {
  event.preventDefault();

  let search = nameInputEl.value.trim();

  let oldCityBtn = document.createElement("button")
  // making the button clickable
  oldCityBtn.addEventListener("click", function() {
 getCity(search);
  })

  oldCityBtn.innerHTML = search
  oldCityContainerEl.append(oldCityBtn)
  console.log(search)

  let newData = search;
  if (localStorage.getItem('citySearched') === null) {
    localStorage.setItem('citySearched', '[]');
  }
  let oldData = JSON.parse(localStorage.getItem('citySearched'));
  if (oldData.includes(newData)) {
    console.log('this already exists');
  } else {
    oldData.push(newData);
  }
  localStorage.setItem('citySearched', JSON.stringify(oldData));
  getCity(search)

};

let getCity = function (getCity) {
  cityContainerEl.innerHTML = "";
  let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + getCity + '&units=imperial' + '&appid=' + ApiKey;
  let fiveDayApiUrl = '';
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          console.log(data.coord.lat)
          console.log(data.coord.lon)

        fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + ApiKey;
        fetchFiveDayCity(fiveDayApiUrl,getCity);

          displayRepos(data, getCity);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather App');
    });
 
 };

// Next 5 days Weather Forecast Fetch
let fetchFiveDayCity = function (fiveDayApiUrl,getCity) {

fetch(fiveDayApiUrl)
.then(function (response) {
  if (response.ok) {
    response.json().then(function (data1) {
      console.log("data1", data1)
      console.log(data1.lat)
      console.log(data1.lon)
      fiveDayDisplayRepos(data1, getCity);
    });
  } else {
    alert('Error: ' + response.statusText);
  }
})
.catch(function (error) {
  alert('Unable to connect to Weather App');
});
}

// Current Weather
let displayRepos = function (data, getCity) {

  // Todays Weather
  let dashboardEl = document.createElement("div")
// Title of Dashboard
  let dashboardTitleEl = document.createElement("h2")
  
  // Todays Date
  let todaysDateWorking=(new Date((data.dt)*1000)).toLocaleString();
let date = new Date(todaysDateWorking); 
		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
		let dateString = (m <= 9 ? '0' + d : d) + '-' + (d <= 9 ? '0' + m : m) + '-' + y;

  dashboardTitleEl.textContent = data.name + " (" + dateString + ")";

// Icon
  let dashboardImg = document.createElement("img");
  dashboardImg.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
  dashboardTitleEl.appendChild(dashboardImg);




// clear previous info
cityContainerEl.innerHTML = "";

  dashboardEl.appendChild(dashboardTitleEl);
  cityContainerEl.appendChild(dashboardEl);

// Contents of Dashboard
  let dashboardOrderedListEl = document.createElement("ol")
  let dashboardList1El = document.createElement("li")
  let dashboardList2El = document.createElement("li")
  let dashboardList3El = document.createElement("li")
  let dashboardList4El = document.createElement("li")

  dashboardList1El.textContent = 'Temp: ' + data.main.temp + '°F';
  dashboardList2El.textContent = 'Wind: ' + data.wind.speed + ' MPH';
  dashboardList3El.textContent = 'Humidity: ' + data.main.humidity + ' %';
  dashboardList4El.textContent = 'UV Index: ' + data.main.uvi;


  dashboardOrderedListEl.appendChild(dashboardList1El);
  dashboardOrderedListEl.appendChild(dashboardList2El);
  dashboardOrderedListEl.appendChild(dashboardList3El);
  dashboardOrderedListEl.appendChild(dashboardList4El);

  dashboardEl.appendChild(dashboardOrderedListEl);
}


let fiveDayDisplayRepos = function (data1, getCity) {
// Next 5 days weather
// 5 day title
fiveDayTitleEl.textContent = "5-Day Forecast:";

// Forecast Day 1
day1.innerHTML = "";
// Day 1 forecast date
let todaysDateWorking=(new Date((data1.daily[0].dt)*1000)).toLocaleString();
let date = new Date(todaysDateWorking); 
		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
		let day1DateString = (m <= 9 ? '0' + d : d) + '-' + (d <= 9 ? '0' + m : m) + '-' + y;

console.log("data1-day1:", data1.daily)

let forecastOrderedListEl = document.createElement("ol");
let forecastList1El = document.createElement("h3");
let img = document.createElement("img");
let forecastList3El = document.createElement("li");
let forecastList4El = document.createElement("li");
let forecastList5El = document.createElement("li");

forecastList1El.textContent = day1DateString;
img.src = 'http://openweathermap.org/img/wn/' + data1.daily[0].weather[0].icon + '@2x.png'
forecastList3El.textContent = 'Temp: ' + data1.daily[0].temp.day + '°F';
forecastList4El.textContent = 'Wind: ' + data1.daily[0].wind_speed + ' MPH';
forecastList5El.textContent = 'Humidity: ' + data1.daily[0].humidity + ' %';

forecastOrderedListEl.appendChild(forecastList1El);
forecastOrderedListEl.appendChild(img);
forecastOrderedListEl.appendChild(forecastList3El);
forecastOrderedListEl.appendChild(forecastList4El);
forecastOrderedListEl.appendChild(forecastList5El);

console.log(forecastOrderedListEl)
console.log(day1)

day1.appendChild(forecastOrderedListEl);

// Forecast Day 2
day2.innerHTML = "";
// Day 2 forecast date
let day2Working=(new Date((data1.daily[1].dt)*1000)).toLocaleString();
let date2 = new Date(day2Working); 
		let d2 = date2.getDate();
		let m2 = date2.getMonth() + 1;
		let y2 = date2.getFullYear();
		let day2DateString = (m2 <= 9 ? '0' + d2 : d2) + '-' + (d2 <= 9 ? '0' + m2 : m2) + '-' + y2;

console.log("data1-day2:", data1.daily[1])

let forecastOrderedListEl2 = document.createElement("ol");
let forecastList1El2 = document.createElement("h3");
let img2 = document.createElement("img");
let forecastList3El2 = document.createElement("li");
let forecastList4El2 = document.createElement("li");
let forecastList5El2 = document.createElement("li");

forecastList1El2.textContent = day2DateString;
img2.src = 'http://openweathermap.org/img/wn/' + data1.daily[1].weather[0].icon + '@2x.png'
forecastList3El2.textContent = 'Temp: ' + data1.daily[1].temp.day + '°F';
forecastList4El2.textContent = 'Wind: ' + data1.daily[1].wind_speed + ' MPH';
forecastList5El2.textContent = 'Humidity: ' + data1.daily[1].humidity + ' %';

forecastOrderedListEl2.appendChild(forecastList1El2);
forecastOrderedListEl2.appendChild(img2);
forecastOrderedListEl2.appendChild(forecastList3El2);
forecastOrderedListEl2.appendChild(forecastList4El2);
forecastOrderedListEl2.appendChild(forecastList5El2);

day2.appendChild(forecastOrderedListEl2);

// Forecast Day 3
day3.innerHTML = "";
// Day 3 forecast date
let day3Working=(new Date((data1.daily[2].dt)*1000)).toLocaleString();
let date3 = new Date(day3Working); 
		let d3 = date3.getDate();
		let m3 = date3.getMonth() + 1;
		let y3 = date3.getFullYear();
		let day3DateString = (m3 <= 9 ? '0' + d3 : d3) + '-' + (d3 <= 9 ? '0' + m3 : m3) + '-' + y3;

console.log("data1-day3:", data1.daily[2])

let forecastOrderedListEl3 = document.createElement("ol");
let forecastList1El3 = document.createElement("h3");
let img3 = document.createElement("img");
let forecastList3El3 = document.createElement("li");
let forecastList4El3 = document.createElement("li");
let forecastList5El3 = document.createElement("li");

forecastList1El3.textContent = day3DateString;
img3.src = 'http://openweathermap.org/img/wn/' + data1.daily[2].weather[0].icon + '@2x.png'
forecastList3El3.textContent = 'Temp: ' + data1.daily[2].temp.day + '°F';
forecastList4El3.textContent = 'Wind: ' + data1.daily[2].wind_speed + ' MPH';
forecastList5El3.textContent = 'Humidity: ' + data1.daily[2].humidity + ' %';

forecastOrderedListEl3.appendChild(forecastList1El3);
forecastOrderedListEl3.appendChild(img3);
forecastOrderedListEl3.appendChild(forecastList3El3);
forecastOrderedListEl3.appendChild(forecastList4El3);
forecastOrderedListEl3.appendChild(forecastList5El3);

console.log(day3)
console.log(forecastOrderedListEl3)

day3.appendChild(forecastOrderedListEl3);

// Forecast Day 4
day4.innerHTML = "";
// Day 4 forecast date
let day4Working=(new Date((data1.daily[3].dt)*1000)).toLocaleString();
let date4 = new Date(day4Working); 
		let d4 = date4.getDate();
		let m4 = date4.getMonth() + 1;
		let y4 = date4.getFullYear();
		let day4DateString = (m4 <= 9 ? '0' + d4 : d4) + '-' + (d4 <= 9 ? '0' + m4 : m4) + '-' + y4;

let forecastOrderedListEl4 = document.createElement("ol");
let forecastList1El4 = document.createElement("h3");
let img4 = document.createElement("img");
let forecastList3El4 = document.createElement("li");
let forecastList4El4 = document.createElement("li");
let forecastList5El4 = document.createElement("li");

forecastList1El4.textContent = day4DateString;
img4.src = 'http://openweathermap.org/img/wn/' + data1.daily[3].weather[0].icon + '@2x.png'
forecastList3El4.textContent = 'Temp: ' + data1.daily[3].temp.day + '°F';
forecastList4El4.textContent = 'Wind: ' + data1.daily[3].wind_speed + ' MPH';
forecastList5El4.textContent = 'Humidity: ' + data1.daily[3].humidity + ' %';

forecastOrderedListEl4.appendChild(forecastList1El4);
forecastOrderedListEl4.appendChild(img4);
forecastOrderedListEl4.appendChild(forecastList3El4);
forecastOrderedListEl4.appendChild(forecastList4El4);
forecastOrderedListEl4.appendChild(forecastList5El4);

day4.appendChild(forecastOrderedListEl4);

// Forecast Day 5
day5.innerHTML = "";
// Day 5 forecast date
let day5Working=(new Date((data1.daily[4].dt)*1000)).toLocaleString();
let date5 = new Date(day5Working); 
		let d5 = date5.getDate();
		let m5 = date5.getMonth() + 1;
		let y5 = date5.getFullYear();
		let day5DateString = (m5 <= 9 ? '0' + d5 : d5) + '-' + (d5 <= 9 ? '0' + m5 : m5) + '-' + y5;

let forecastOrderedListEl5 = document.createElement("ol");
let forecastList1El5 = document.createElement("h3");
let img5 = document.createElement("img");
let forecastList3El5 = document.createElement("li");
let forecastList4El5 = document.createElement("li");
let forecastList5El5 = document.createElement("li");

forecastList1El5.textContent = day5DateString;
img5.src = 'http://openweathermap.org/img/wn/' + data1.daily[4].weather[0].icon + '@2x.png'
forecastList3El5.textContent = 'Temp: ' + data1.daily[4].temp.day + '°F';
forecastList4El5.textContent = 'Wind: ' + data1.daily[4].wind_speed + ' MPH';
forecastList5El5.textContent = 'Humidity: ' + data1.daily[4].humidity + ' %';

forecastOrderedListEl5.appendChild(forecastList1El5);
forecastOrderedListEl5.appendChild(img5);
forecastOrderedListEl5.appendChild(forecastList3El5);
forecastOrderedListEl5.appendChild(forecastList4El5);
forecastOrderedListEl5.appendChild(forecastList5El5);

day5.appendChild(forecastOrderedListEl5);
}


userFormEl.addEventListener('submit', formSubmitHandler);


