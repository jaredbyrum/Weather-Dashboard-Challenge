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
// 0, 8, 16, 24, 32, 39 list items

$(function(){
    var today = dayjs()
    $('#time').text(dayjs().format("MMMM DD, YYYY"));
    
   
    var cityName = '';
    //generate elements func
    function loadList(){
        $('#prev-search').eq(9).remove();
        $("<button id='history' class='btn btn-secondary w-100 my-3'>"+cityName+"</button>").prependTo('#prev-search');
    }
    //only save ten items func
    var i = 0;
    function saveItems(){
        if (i === 10){
            i = 0;
        } else {
            i++; 
            localStorage.setItem(i, cityName);  
        } 
    }

    //func for main button
    $('#submit').click(function(event){
        event.preventDefault();
        cityName = $('#city-search').val();
        loadList();
        saveItems();
        weather(cityName);
    })

    //func for search history
    $('#history').on('click', function(event){
        event.preventDefault();
        cityName = event.target.innerHTML;
        loadList();
        saveItems();
        weather(cityName);
    })
    
    

    //weather function
    function weather(cityName){
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
                        console.log('here', data[i])
                        var lat = data[i].lat.toString()
                        var lon = data[i].lon.toString()
                    }
                }
        var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=13b4e423f9a07e67b579be6abba16366&units=imperial";        
            fetch(weatherAPI)
                //
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data)
                    
                })    
            })   
            
    }   
        
    function printWeather(cityName, ){
        var weather = {
            temp: data.list[i].main.temp,
            humidity: data.list[i].main.humidity,
            wind: data.list[i].wind.speed,
            icon: data.list[i].weather.icon
        }
    }    
        
        
        
        
        
        
})

    
    











    
