const APIKey = "84ae5461ca0dd25d6c96a7e3edea8d1c";
const searchBtn = document.getElementById('search');

searchBtn.addEventListener('submit', function(event){
    event.preventDefault();

    let city = document.getElementById("search").value;
    localStorage.setItem("city", city);
})

// localStorage.getItem('city');


// const geoCode =`http://api.openweathermap.org/geo/1.0/direct?q=${city},{state code},{US}&limit=5&appid=${APIKey}`;

// const querURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

// fetch(geoCode)
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// })

// fetch(querURL)
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// })

