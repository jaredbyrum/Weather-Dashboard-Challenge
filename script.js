//weather API response fields JSON
//list.main.temp
//list.main.humidity
//list.wind.speed
//list.weather.icon

//get coordinites from geocoding API response, input values into weather api fetch, response contains weather data
//pull dates from response, current date and next five days in BOTTOM card deck
//save responses to different elements
//save serach to local storage and diplay on LEFT UL make buttons that refresh that cities fetch
// api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=13b4e423f9a07e67b579be6abba16366"

var searchHistory = document.getElementById('prev-search');

$(function(){
    var today = dayjs()
    $('#time').text(dayjs().format("MMMM DD, YYYY"));
    
   
    //geocode api fetch
    function geo(){
        var geocodeAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",US&appid=13b4e423f9a07e67b579be6abba16366";
        fetch(geocodeAPI)
            .then(function (response){
                return response.json();
            })
            .then(function (data){
                console.log(data)
                //finds the city in the returned array that best matches cityName
                for(let i = 0; i < data.length; i++){
                    if (data[i].name === cityName){
                        var lat = data[i].lat
                        var lon = data[i].lon
                    }
                }
            })
    }

    function weather(){
        var latStr = lat.toString();
        var lonStr = lon.toString();
        var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latStr + "&lon=" + lonStr + "&appid=13b4e423f9a07e67b579be6abba16366";
         fetch(weatherAPI)
            console.log(weatherAPI)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data)
            })
    }  
    
    var i;
    i = 0
    $('#submit').click(function getCityName(event){
        event.preventDefault();
        var cityName = '';
        i++;
        if(!$('#city-search').val()){
            cityName = event.target.innerHTML;
        } else {
            do{
                localStorage.removeItem(i);
                cityName = $('#city-search').val();
                localStorage.setItem(i, cityName);
                if ($('#prev-search').has("."+ i)){
                    $('.'+ i).innerHTML = cityName;
                } else {
                    var saveSearch = document.createElement('button');
                    $(saveSearch).addClass(i+'btn btn-secondary my-3 w-100');
                    $('#prev-search').append(saveSearch);  
                }
            }
            while (i < 10);  
        }
    })
    
       
        
        
        
        
        
        
        
        
})

    
    











    
