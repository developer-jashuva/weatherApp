
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 	'ac21505d7eaf2219d72ea9180cfe00f2';//replace it with your apikey
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const getLocationElement = document.getElementById('getLocation');

const locationInputElement = document.getElementById('locationInput');
const searchButtonElement = document.getElementById('searchButton');


getLocationElement.addEventListener('click',()=>{
    getLocation();
});




function getWeather(loc){
    const url = `${apiUrl}?q=${loc}&appid=${apiKey}&units=metric`;
   
    fetch(url).then(response => response.json()).then((data)=>{
        temperatureElement.innerHTML = `<p>Temprature : ${data.main.temp}</p>`;
        locationElement.innerHTML = `<p>Location : ${data.name}</p>`;
        descriptionElement.innerHTML = `<p>Description : ${data.weather[0].description}</p>`;
    }).catch(error => {
   
    locationElement.innerHTML = `<p>Enter the location correctly ${error}</p>`;
})
    
}



searchButton.addEventListener('click',()=>{
    locationValue = locationInputElement.value;
   
         if(locationValue){
                getWeather(locationValue);
                    }
        else{
               locationElement.innerHTML = `<p>Enter location</p>`;
                       }           
              });



function getLocation() {      
     if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition((position) => {
     const lat = position.coords.latitude;
      const long = position.coords.longitude;
  
fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`).then(
  response=>response.json()).then((data)=>{
     let city = data[0].local_names.en;
        getWeather(city);
        console.log(data);
        
      }).catch(error => {
               locationElement.innerHTML = error;
                   });
           });
              } };

