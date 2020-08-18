<template>
  <div id="app" class="container">
    <div v-if="dates">
      <h1 style="text-align:center;font-weight:600;">Armenia Covid-19 statistics</h1>
      <h4 style="text-align:center;font-weight:500;">By Tigran Arshakyan</h4>
      <div class="col">
        <DoughnutChart :chartData="dates"/>
        <h2>Confirmed cases</h2>
        <LineChart :chartData="dates" :options="chartOptions" :label="'Confirmed'" />
      </div>
      <div class="col">
        <h2>Active cases</h2>
        <LineChart :whattoload="'active'" :chartData="dates" :options="chartOptions" :label="'Active'" />
      </div>
      <div class="col">
        <h2>Daily cases</h2>
        <LineChart :whattoload="'todayNew'" :chartData="dates" :options="chartOptions" :label="'New Cases per day'" />
      </div>
      <div class="col">
        <h2>Deaths</h2>
        <LineChart :whattoload="'deaths'" :chartData="dates" :options="chartOptions" :label="'Deaths'" />
      </div>
      <div class="col">
        <h2>Daily Deaths</h2>
        <LineChart :whattoload="'newDeaths'" :chartData="dates" :options="chartOptions" :label="'New Deaths'" />
      </div>
      <div class="col">
        <h2>Daily Recovered</h2>
        <LineChart :whattoload="'newRecovered'" :chartData="dates" :options="chartOptions" :label="'New Recovered'" />
      </div>
      <div class="col">
        <h2>Recovered</h2>
        <LineChart :whattoload="'recovered'" :chartData="dates" :options="chartOptions" :label="'Recovered'" />
      </div>

      <div style="margin-top:30px">
        <TableData :chartData="dates"/>
      </div>

      <kinesis-container id="content-desktop" style="margin-top:40px;" event="move">
        <div style="text-align:center;font-weight:500" class="jumbotron">
          <kinesis-element :strength="200" transformOrigin="center" type="translate" axis="x">
            <h1 style="text-align:center;font-weight:500">Contact Me</h1>
            <abbr class="email-link" title="tigranarshakyan04@gmail.com" >Email</abbr>
            <h2 class="email-link" id="content-mobile" title="tigranarshakyan04@gmail.com" >tikoarshakyan04@gmail.com</h2>
          </kinesis-element>
          <kinesis-element :strength="200" type="translate" axis="x">
            <a href="https://www.instagram.com/ar______t__10/ "><img width="100px" height="100px" src="./assets/instagram.png"/></a>
          </kinesis-element>        
        </div>
      </kinesis-container>

        <div id="content-mobile" style="text-align:center;font-weight:500" class="jumbotron">
            <h1 style="text-align:center;font-weight:500">Contact Me</h1>
            <h4 class="email-link" title="tigranarshakyan04@gmail.com" >Email</h4>
            <h4>tikoarshakyan04@gmail.com</h4>
            <a href="https://www.instagram.com/ar______t__10/ "><img width="100px" height="100px" src="./assets/instagram.png"/></a>
        </div>
      
    </div>
    <div class="overlay" v-else>
      <img style="margin-left:30%;width:40%" src="./assets/loading.svg">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LineChart from './components/LineChart'
import DoughnutChart from './components/DoughnutChart'
import TableData from './components/TableofData'

export default {
  name: "App",
  components: {LineChart, DoughnutChart, TableData},
  data() {
    return {
      month: new Date().getMonth() + 1,
      day : new Date().getDate(),
      year : new Date().getFullYear(),
      country: 'Armenia',
      data : null,
      dates : null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  async created() {
    const { data } = await axios.get(`
      https://api.covid19tracking.narrativa.com/api/country/armenia?date_from=${this.year}-${this.month -1}-${this.day}&date_to=${this.year}-${this.month}-${this.day}
    `);
    this.data = await data
    this.dates = Object.entries(await data.dates ).map((e) => ( { [e[0]]: e[1] } ));
  }
};
</script>

<style lang="less">
.overlay{
  background-color:#F1F2F3;
    position:fixed;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    z-index:1000;
}
* {
  font-family: 'Ubuntu Mono', sans-serif;
}
.email-link {
  font-size: 200%;
  background: -webkit-linear-gradient(90deg, rgba(205,88,20,1) 0%, rgba(255,65,2,1) 29%, rgba(255,15,165,1) 100%);;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#content-desktop {display: block;}
#content-mobile {display: none;}

@media screen and (max-width: 768px) {

#content-desktop {display: none;}
#content-mobile {display: block;}

}
</style>
