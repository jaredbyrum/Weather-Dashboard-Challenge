//timer
var today = dayjs()
$('#time').text(dayjs().format("MMMM DD, YYYY"));
//lat and lon variables
var lat = '';
var lon = '';
$(function(){
    function getForecast(){
        var requestURL = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=13b4e423f9a07e67b579be6abba16366";
        
        fetch(requestUrl)
            .then(function (response) {
            return response.json();
         })
            .then(function(){

            })

    }














    
})