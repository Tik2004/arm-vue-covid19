<template>
  <div id="app" class="container">
    <v-style v-if="dark">
      html {
        background-color:black;
        filter: invert(1);
      }
      img,span,#name {
        -webkit-filter: invert(1);
        filter: invert(1);
      }
    </v-style>
    <div v-if="dates">
      <h1 style="letter-spacing:4px;font-family:'Do Hyeon',sans-serif;text-align:center;font-weight:600;">Armenia Covid-19 stats</h1>
      <h4 id="name" style="text-align:center;font-weight:900;">By Tigran Arshakyan</h4>
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

      <div style="margin:30px 0">
        <TableData :chartData="dates"/>
      </div>

      <div style="text-align:center">
        <button @click="changeTheme" class="btn btn-outline-danger">{{themename}}</button>
      </div>
      <kinesis-container id="content-desktop" style="margin-top:40px;" event="move">
        <div style="text-align:center;font-weight:500" class="jumbotron">
          <h1 style="letter-spacing:4px;font-family:'Do Hyeon',sans-serif;text-align:center;font-weight:600;">Contact Me</h1>
          <kinesis-element :strength="200" transformOrigin="center" type="translate" axis="x">
            <button @click="showEmail" style="font-size:40px" class="btn btn-light text-danger"> Email <span class="badge badge-danger text-light">👈 Click Me</span></button>
          </kinesis-element>
          <div class="container">
            <div class="col">
              <kinesis-element :strength="30" type="depth">
                <a href="https://www.instagram.com/ar______t__10/ "><img width="100px" height="100px" src="./assets/instagram.png"/></a>      
                <a href="https://www.github.com/Tik2004 "><img width="100px" height="100px" src="./assets/github.svg"/></a>
              </kinesis-element>
            </div>
          </div>
        </div>
      </kinesis-container>

        <div id="content-mobile" style="text-align:center;font-weight:500; margin-top:20px;" class="jumbotron">
            <h1 style="letter-spacing:4px;font-family:'Do Hyeon',sans-serif;text-align:center;font-weight:600;">Contact Me</h1>
            <button @click="showEmailforphone" class="btn btn-light text-danger"> Email <span class="badge badge-danger text-light">👈 Click Me</span></button>
            <br>
            <a href="https://www.instagram.com/ar______t__10/ "><img width="100px" height="100px" src="./assets/instagram.png"/></a>
            <a href="https://www.github.com/Tik2004 "><img width="100px" height="100px" src="./assets/github.svg"/></a>
        </div>
      
    </div>
    <div class="overlay" v-else>
      <img class="loader" src="./assets/loading.gif">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LineChart from './components/LineChart'
import DoughnutChart from './components/DoughnutChart'
import TableData from './components/TableofData'
import swal from 'sweetalert';

export default {
  name: "App",
  components: {LineChart, DoughnutChart, TableData},
  data() {
    return {
      thisDate: this.$moment().format('YYYY-MM-DD'),
      previousDate: this.$moment().subtract(1, 'months').format('YYYY-MM-DD'),
      country: 'Armenia',
      data : null,
      dark:false,
      themename:"Dark",
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
  methods : {
    changeTheme() {
      this.dark = !this.dark
      if (this.dark) {
        this.themename = "Light"
      }
      else {
        this.themename = "Dark"
      }
    },
    showEmail() {
        swal({
          title: "tigranarshakyan04@gmail.com",
          text: "",
          icon: "success",
          button: "I will get in touch!",
        });
      },
    showEmailforphone() {
        swal({
          title: "",
          text: "tigranarshakyan04@gmail.com",
          icon: "success",
          button: "I will get in touch!",
        });
      },    
    },
    
  async created() {
    const { data } = await axios.get(`
      https://api.covid19tracking.narrativa.com/api/country/armenia?date_from=${this.previousDate}&date_to=${this.thisDate}`);
    this.data = await data
    this.dates = Object.entries(await data.dates ).map((e) => ( { [e[0]]: e[1] } ));
  }
};
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
.overlay{
    position:fixed;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    z-index:1000;
}
.loader {
  margin-left: 25%;
}
@media screen and (max-width: 768px) {

.loader{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%
}
}
* {
  font-family: 'Ubuntu Mono', monospace;
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
#name {
  animation: glow 1s infinite alternate;
  color:white;
}
.dark {
  background-color: black;
  filter: invert(1);
}
.light {
  background-color: wite;
  filter: invert(0);
}


@keyframes glow {
  0% {
    text-shadow: 0px 0px 12px #FF456A, 0px 0px 15px #FF456A, 0px 0px 10px #FF456A, 0px 0px 10px #FF456A;
  }
  50% {
    text-shadow: 0px 0px 12px #FF456A, 0px 0px 15px #FF456A, 0px 0px 10px #FF456A, 0px 0px 10px #FF456A, 0px 0px 20px #FF456A, 0px 0px 20px #FF456A;
  }
  100% {
    text-shadow: 0px 0px 12px #FF456A, 0px 0px 15px #FF456A, 0px 0px 10px #FF456A, 0px 0px 10px #FF456A;
  }
}
</style>
