// Variabelen betrokken bij de gegevens op de OpenWeatherMap
var weather;
var api = 'http://api.openweathermap.org/data/2.5/weather?zip=';
var apiKey = ',nl&APPID=9a947b2b6130ce57fb318b02748ff301';
var units = '&units=metric';
var input;
var mymap = L.map('mapid').setView([52.23, 5.55], 7); //var marker = L.marker([51.5, -0.09]).addTo(mymap);
var layerGroup = L.layerGroup().addTo(mymap);

// Variabelen betrokken bij de data verkregen van de API
var x;
var y;
var temp;
var feelsLike;
var minTemp;
var maxTemp;
var pressure;
var humidity;
var wind;
var description;
var windSpeed;



L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibnltcGg0NCIsImEiOiJjazczZnppMXEwYnMyM2tudmRkODRpcXN5In0.7Ni9qFzGMFQlwSzeou4L-g'
}).addTo(mymap);


function setup() {
    var canvas = createCanvas(1920, 1080);
    var button = select('#submit');
    button.mousePressed(weerOpvragen);
    $('#postCode').on('blur keydown', function(e) {
        if (e.type == 'blur' || e.key === 'Enter')
            weerOpvragen();
    });

    input = select('#postCode');
    canvas.parent('mapid');


}

// Met deze functie wordt URL herschreven om de input van de 
// gebruiker te verwerken en terug te geven.
function weerOpvragen() {
    var url = api + input.value() + apiKey + units;
    loadJSON(url, gotData);
}

// In deze functie worden alle gegevens uit de API gehaald
function gotData(data) {
    weather = data;
    x = weather.coord.lon;
    y = weather.coord.lat;
    temp = weather.main.temp;
    feelsLike = weather.main.feels_like;
    minTemp = weather.main.temp_min;
    maxTemp = weather.main.temp_max;
    pressure = weather.main.pressure;
    humidity = weather.main.humidity;
    windSpeed = weather.wind.speed;
    wind = weather.wind.speed;
    description = weather.weather.desciption;
    stad = weather.name;

    console.log(windSpeed, data);
    localStorage.setItem(stad, JSON.stringify(weather));

    //Toevoeging op de kaart voor de exacte locatie 
    layerGroup.clearLayers();
    var circle = L.circle([y, x], {
        color: 'white',
        fillColor: '#601df7',
        fillOpacity: 0.5,
        radius: 4500
    }).addTo(layerGroup);


    // Popup met gegevens op de kaart
    var popup = L.popup()
        .setLatLng([y, x])
        .setContent(
            '<ul class="list-group">' +
            '<li class="list-group-item active">' + '<h6>' + stad + '</h6>' +
            '<h2 class="font-weight-bold">' +
            temp.toString() + 'º</h2></li>' +
            '<li class="list-group-item">' + '<h6 class="font-weight-bolder"> Vochtigheid</h6>' +
            humidity.toString() + "%" + '</li>' +
            '</ul>'
        )
        .openOn(mymap);
    //Functie die de gegevens toevoegd aan de container voor opgeslagen 
    //Postcodes        
    templateForComparison();

}

// Functie wordt gebruikt om bootstrap cards te vullen met data uit de API
function templateForComparison(dataObj) {
    $('#weatherComparisonContainer').empty()

    // Alle data wordt lokaal opgeslagen en weergegeven in de sectie weatherComparison
    for (var i = 0; i < localStorage.length; i++) {
        stad = localStorage.key(i);
        stadData = JSON.parse(localStorage.getItem(stad)).main
        stadWind = JSON.parse(localStorage.getItem(stad)).wind
        if (stad !== undefined && stad !== '') {
            $('#weatherComparisonContainer').append(
                '<table class="table table-sm table-dark">' +
                '<tbody style="width:100%!important;">' +
                '<tr>' +
                '<th scope="col" id="naamstadF">' + stad + '</th>' +
                '<td id="naamstad">' + stadData.temp + '</td>' +
                '<td id="naamstad">' + stadWind.speed + '</td>' +
                '<td id="naamstad">' + stadData.humidity + '</td>' +
                '<td id="naamstad">' + stadData.pressure + '</td>' +
                '</tr>' +
                '<tr>' +
                '</tbody>' +
                '</table>' +
                '</div>');
            let myChart = document.getElementById('myChart').getContext('2d');
            let massPopChart = new Chart(myChart, {
                type: 'bar', // bar, horizontalBar, pie, line, radar etc
                data:

                {

                    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
                        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00',

                    ],
                    datasets: [{
                        label: 'Regen',
                        backgroundColor: 'rgba(137, 196, 244, 1)',
                        data: [
                            stadData.humidity,
                            stadData.temp,
                            stadData.feels_like,
                            stadData.max
                        ]

                    }],

                },
                options: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            fontColor: 'white'
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                maxTicksLimit: 11,
                                max: 100,
                                suggestedMax: 100,
                                fontColor: 'white'
                            }
                        }]
                    }
                }
            });
        }
    }
}

templateForComparison();