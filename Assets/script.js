let ApiKey = 'a5f1951d920262d2e977eef2129fc60f';

let nameInputEl = document.querySelector('#search');
let userFormEl = document.querySelector('#user-form');
let cityContainerEl = document.querySelector('#city-container');
let oldCityContainerEl = document.querySelector('#old-cities-container');

let formSubmitHandler = function (event) {


  event.preventDefault();

  let search = nameInputEl.value.trim();


  let oldCityBtn = document.createElement("button")
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
  let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + getCity + '&appid=' + ApiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)


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





let displayRepos = function (data, getCity) {

  // Converts the UNIX timestamp to required date & time
  let todaysDate = (data.dt);
  let date = new Date(todaysDate * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  console.log(formattedTime);

  function convertDate(date) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }
  console.log(convertDate(date));

  let dashboardEl = document.createElement("div")

  let dashboardTitleEl = document.createElement("h2")
  dashboardTitleEl.textContent = data.name + " (" + convertDate(date) + ")";




  // let dashboardIconEl = document.createElement("IMG")
  // dashboardIconEl = data.weather.icon;
  // console.log(data.weather.icon)

  let dashboardOrderedListEl = document.createElement("ol")
  let dashboardList1El = document.createElement("li")
  let dashboardList2El = document.createElement("li")
  let dashboardList3El = document.createElement("li")
  let dashboardList4El = document.createElement("li")


  dashboardList1El.textContent = 'Temp: ' + data.main.temp + '°F';
  dashboardList2El.textContent = 'Wind: ' + data.wind.gust + ' MPH';
  dashboardList3El.textContent = 'Humidity: ' + data.main.humidity + ' %';
  dashboardList4El.textContent = 'UV Index: ' + data.main.uvi;




  dashboardEl.appendChild(dashboardTitleEl);
  // dashboardEl.appendChild(dashboardIconEl);

  dashboardOrderedListEl.appendChild(dashboardList1El);
  dashboardOrderedListEl.appendChild(dashboardList2El);
  dashboardOrderedListEl.appendChild(dashboardList3El);
  dashboardOrderedListEl.appendChild(dashboardList4El);


  dashboardEl.appendChild(dashboardOrderedListEl);

  cityContainerEl.appendChild(dashboardEl);
}


userFormEl.addEventListener('submit', formSubmitHandler);
