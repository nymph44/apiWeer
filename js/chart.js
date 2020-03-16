
let myChart = document.getElementById('myChart').getContext('2d');
let massPopChart = new Chart(myChart, {
    type:'bar', // bar, horizontalBar, pie, line, radar etc
data:

    {
    
    labels:['00:00', '01:00','02:00', '03:00','04:00', '05:00','06:00', '07:00','08:00', '09:00','10:00', '11:00','12:00',
    '12:00','13:00', '14:00','15:00', '16:00','17:00', '18:00','19:00', '20:00','21:00', '22:00','23:00', '24:00',
    
],
    datasets:[{
        label: 'Regen',
        backgroundColor:'rgba(137, 196, 244, 1)',
        data:[
            73,
            74,
            50,
            56
            ],
            data:[
                10,
                50,
                80,
                90
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
                    max:100,
                    suggestedMax: 100,
                    fontColor: 'white'
                }
            }]
        }
    }
});








    

