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
    var today = dayjs().format("MMMM DD, YYYY");
    $('#time').text(dayjs().format("MMMM DD, YYYY"));
    
   
    var cityName = '';
    
    //load previous searches
    console.log(localStorage.length)
    function loadHistory(){
        for (let i = 0; i <= localStorage.length; i++) { 
            if(localStorage.getItem(i) !== null){
                $("<li><button class='history btn btn-secondary w-100 my-2'>"+ localStorage.getItem(i) +"</button></li>").prependTo('#prev-search');  
            }
        }  
    }
    loadHistory()

    //only save eight items func
    let key = localStorage.length;
    function saveItems(){
        if (key === 8){
            key = 0;
        } else {
            key++; 
            localStorage.setItem(key, cityName);  
        } 
    }
   
    //generate elements func
    function loadList(){
        $('#prev-search li').eq(7).remove();
        $("<li><button class='history btn btn-secondary w-100 my-2'>"+cityName+"</button></li>").prependTo('#prev-search');
    }

    //func for main button
    $('#submit').click(function(event){
        event.preventDefault();
        cityName = $('#city-search').val();
        weather(cityName);
    })

    //func for search history
    $(document).on('click', '.history', function(event){
        event.preventDefault();
        cityName = event.target.textContent;
        weather(cityName);
    })

    //hide modal
    $('#hide').on('click', function(event){
        event.preventDefault();
        $('.modal').modal('hide');
    })
    
    //weather function
    function weather(cityName){
        var geocodeAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",US&appid=13b4e423f9a07e67b579be6abba16366";
        
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
            var weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=13b4e423f9a07e67b579be6abba16366&units=imperial";        
            fetch(weatherAPI)
                .then(function(response){
                    if(response.status !== 200){
                        $('.modal').modal('show');
                        return;
                    } else {
                        loadList();
                        saveItems();
                        return response.json(); 
                    }
                })
                .then(function(data){
                    console.log(data)
                    //creating array of each unique date
                    const uniqueDays = [];
                    const formattedDays = [];
                    const weatherData = {};
                    //removes time stamp at end of date to only return unique days
                    data.list.forEach(item => {
                        const dt = item.dt_txt.slice(0, 10)
                        var formattedDate = dayjs(dt).format('MM/DD/YYYY')
                        if (!uniqueDays.includes(dt)) {
                            uniqueDays.push(dt);
                            weatherData[dt] = item;
                            formattedDays.push(formattedDate);
                        }
                    })
                console.log(uniqueDays)
                console.log(weatherData)
                printWeather(cityName, formattedDays, uniqueDays, weatherData)               
                })
                
            })   
    }   

    function printWeather(cityName, formattedDays, uniqueDays, weatherData){
        for(let i = 0; i < uniqueDays.length; i++){
                var day = '#day' + i;
                console.log(day) 
                var weather = {
                    temp: weatherData[uniqueDays[i]].main.temp.toString(),
                    humidity: weatherData[uniqueDays[i]].main.humidity.toString(),
                    wind: weatherData[uniqueDays[i]].wind.speed.toString(),
                    icon: weatherData[uniqueDays[i]].weather[0].icon.toString()
                }
            // link to icon pngs
            var iconUrl = "https://openweathermap.org/img/wn/" + weather.icon + ".png"
                //first day
                $(day).children('#city-info').children('#cityName').text(cityName + " (" + today + ")")
                $(day).children('#city-info').children('#wicon').attr('src', iconUrl)
                // weather 
                $(day).children('.card-title').text(formattedDays[i])
                $(day).children('#temp').text('Temp: ' + weather.temp + 'ºF')
                $(day).children('#humidity').text('Humidiity: ' + weather.humidity + '%')
                $(day).children('#wind').text('Wind: ' + weather.wind + 'MPH')
                $(day).children('#wicon').attr('src', iconUrl)
                $(day).children('#wicon').attr('style', 'height: 50px; width:50px')
        }       
    }
})
          