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
    var cityName = '';
    var i;
    i = 0;
    //generate elements func
    function loadList(){
        $('#prev-search').eq(9).remove();
        $("<button class='btn btn-secondary w-100 my-3'>"+cityName+"<button>").prependTo('#prev-search');
    }
    //only save ten items func






    //func for main button
    $('#submit').click(function(event){
        event.preventDefault();
        cityName = $('#city-search').val();
        i++;
        localStorage.setItem(i, cityName)
        loadList(cityname)
    })

    //func for search history
    $('#history').on('click', function(event){
        event.preventDefault();
        cityName = event.target.innerHTML;
        i++;
        localStorage.setItem(i, cityName)
        loadList(cityName)
    })
    
       
        
        
        
        
        
        
        
        
})

    
    











    
