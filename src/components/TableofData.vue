
<template>
    <table class="table table-striped" id="tabule">
  <thead>
    <tr  style="letter-spacing:2px;">
      <th style="font-family:'Do Hyeon',sans-serif;" scope="col">Case type</th>
      <th style="font-family:'Do Hyeon',sans-serif;" scope="col">People</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Infected</th>
      <td>{{confirmed}}</td>
    </tr>
    <tr>
      <th scope="row">Infected today</th>
      <td>{{newConfirmed}}</td>
    </tr>
    <tr>
      <th scope="row">Active</th>
      <td>{{active}}</td>
    </tr>
    <tr>
      <th scope="row">Deaths</th>
      <td>{{deaths}}</td>
    </tr>
    <tr>
      <th scope="row">Deaths today</th>
      <td>{{newDeaths}}</td>
    </tr>
    <tr>
      <th scope="row">Recovered</th>
      <td>{{recovered}}</td>
    </tr>
    <tr>
      <th scope="row">Recovered today</th>
      <td>{{newRecovered}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
    props : {
        chartData : {
            type:Array
        }
    },
    data() {
        return {
            deaths : 0,
            newDeaths : 0,
            confirmed : 0,
            newConfirmed : 0,
            active : 0,
            recovered : 0,
            newRecovered : 0,
        }
    },
    created() {
            const slk = this.chartData[Object.keys(this.chartData)[[Object.keys(this.chartData)][0].length -1]];
            const slk2 = slk[Object.keys(slk)[0]];
            
            this.deaths = slk2.countries.Armenia.today_deaths;
            this.newDeaths = slk2.countries.Armenia.today_new_deaths;
            this.confirmed = slk2.countries.Armenia.today_confirmed;
            this.newConfirmed = slk2.countries.Armenia.today_new_confirmed;
            this.active = slk2.countries.Armenia.today_open_cases;
            this.recovered = slk2.countries.Armenia.today_recovered;
            this.newRecovered = slk2.countries.Armenia.today_new_recovered;
    }
}
</script>

<style lang="less" scoped>

</style>