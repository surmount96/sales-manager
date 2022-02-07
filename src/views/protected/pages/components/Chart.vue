<template>
    <div class="">
        <div class="">
            <div id="chart"></div>
        </div>
    </div>
</template>

<script>
import ApexCharts from 'apexcharts'

export default {
    data(){
        return {

        }
    },
    mounted(){
        var options = {
          series: [
              {
                name: "High - 2013",
                data: [40, 29, 19, 1, 2, 17, 33]
            },
            {
                name: "Low - 2013",
                data: [1, 2, 14, 18, 47, 13, 3]
            }
            ],
          chart: {
          height: 350,
          type: 'area',
          dropShadow: {
            enabled: false,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: '',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          opposite: true
        },
        tooltip: {
          shared: false,
         
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

     
    },
    methods:{

    }
}
</script>