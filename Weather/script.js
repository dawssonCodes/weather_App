var input = document.querySelector(".searchBox");                  //variable for search box
var searchButton = document.querySelector(".searchButton");        //Variable for search button

let weather = {
    "apiKey":"2821b9be9e81504fb3a2f90daa2067cc",
    fetchWeather: function(city){                                      //function to fetch weather for an api
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city
         + "&units=metric&appid="
         + this.apiKey
        )
        .then((response)=>response.json())
        .then((data) => this.weatherInfo(data));
    },
    weatherInfo: function(data) {                                        //function to extract specific details for the app
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        document.querySelector(".temp").innerText =  temp + "°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity+ "%";
        document.querySelector(".windSpeed").innerText = "Wind speed: " + speed+ "Km/h";
        document.querySelector(".loading").classList.remove("loading");
    },
    search: function(){
        this.fetchWeather(input.value)
    }
}

searchButton.addEventListener('click', function(){                    //Event listener for search button
    weather.search();
})

document.addEventListener('keypress', function (e) {                 //Event listener for Enter Key
    if (e.key === 'Enter') {
      weather.search();
    }
})

weather.fetchWeather("Accra")