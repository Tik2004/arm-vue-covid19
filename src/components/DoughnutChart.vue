<script>
import {Doughnut} from "vue-chartjs"

export default {
    extends: Doughnut,
    props : {
        chartData: {
            type: Array
        }
    },
    data() {
        return {
            options : {maintainAspectRatio: false,responsive: true,},
            colors:['#aeea00','#f57c00','#ffea00','#1e88e5','#f44336','#ff1744','#039be5', '#d500f9','#42a5f5','#80cbc4','#81c784','#eeff41','#c6ff00','#ff7043','#78909c','#00b0ff']
        }
    },
    mounted() {
        const deaths = [];
        const actives = [];
        const recovered = []
        const slk = this.chartData[Object.keys(this.chartData)[[Object.keys(this.chartData)][0].length -1]]
        const slk2 = slk[Object.keys(slk)[0]]
        deaths.push(slk2.countries.Armenia.today_deaths);
        actives.push(slk2.countries.Armenia.today_open_cases);
        recovered.push(slk2.countries.Armenia.today_recovered); 

        this.renderChart({
            labels: ["Actives","Deaths","Recovered"],
            datasets: [{
                label: "BALBAL",
                data: [actives,deaths,recovered],
                backgroundColor: [this.colors[Math.floor(Math.random() * 15)],this.colors[Math.ceil(Math.random() * 15)],this.colors[Math.round(Math.random() * 15)]]
            }]
        },this.options)
    }
}
</script>