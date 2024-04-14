//yeah main function hai jo server side pe api call karega isko async wait se kar raha hun taki main flow ko block na kare promise bhi use kar sakta tha but 
//wo chate mote code ke liye use sahi rehgta hai agar 2-3 line ka ho to .
async function getWeatherByCity(cityName,apiKey) {
    
    //equals(=)ke baad jo bhi hai wo key hai
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
// error handling ke liye lagayi hai agar koi error aayega to wesite crash nahin hogi 
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.cod==404){
            alert("enter a valid city");
            document.getElementById("city-text").value="";
        }
        return data;
    } catch (error) {
        console.log("Error fetching weather data:", error);
        return error;
    }
}

document.getElementById("Search").addEventListener("click", () => {
    // Get the value of the input field
    const cityName = document.getElementById("city-text").value;
    
    //space hatayi haii aage peeche ki api calling main spelling mistake issue de sakti hai
    if (cityName.trim() !== "") {
        //yeah apna main function hai jo client side yani apni side ui handle karega 
        fetchWeather(cityName);
    } else {
        // agar khali city ka naam ho to wo handle kiya hai 
        // tu chahe to naam 3 letter ya 2 letter se bada hona chahiye wali condition bhi laga sakta hai 
        console.error("City name cannot be empty");
    }
});

function fetchWeather(cityName) {
   
    let apiKey="8a3e45c8094a0395c06727f1ffe9ec01";
    //iss line se internal promise chaining ki hai async await ka bhi use kar sakte the agar chaho to ...
    getWeatherByCity(cityName, apiKey)
        .then(weatherData => {
            if(weatherData.cod==200){
            document.getElementById("temp").value=Math.floor((weatherData.main.temp-273));
            document.getElementById("temp_max").value=Math.floor((weatherData.main.temp_max-273));
            document.getElementById("temp_min").value=Math.floor((weatherData.main.temp_min-273));
            document.getElementById("humidity").value=(weatherData.main.humidity);
            document.getElementById("pressure").value=(weatherData.main.pressure);
            document.getElementById("sea_level").value=weatherData.main.sea_level;
            document.getElementById("grnd_level").value=weatherData.main.grnd_level;
            document.getElementById("feels_like").value=Math.floor((weatherData.main.feels_like-273));
            }
            
            //  agar aur kuch karna ho to kar liyo yahan data ke saath
        })
        .catch(error => {
            console.error("An error occurred:", error);
            // waise error aayega nahin aayega to wo waha try catch main handle ho jayega fir bhi dal diya hai acha impression padega
        });
}
