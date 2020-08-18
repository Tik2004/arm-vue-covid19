<script>
import {Line} from "vue-chartjs"

export default {
    extends: Line,
    props : {
        label: {
            type: String
        },
        chartData: {
            type: Array
        },
        options: {
            type: Object
        },
        whattoload : {
            type: String
        }
    },
    data() {
        return {
            
            colors:['#aeea00','#f57c00','#ffea00','#1e88e5','#f44336','#ff1744','#039be5', '#d500f9','#42a5f5','#80cbc4','#81c784','#eeff41','#c6ff00','#ff7043','#78909c','#00b0ff']
        }
    },
    mounted() {
        const dates = [];
        const totals = [];
        this.chartData.forEach(d => dates.push(d[Object.keys(d)[0]].countries.Armenia.date) );

        switch (this.whattoload) {
            case 'todayNew':
                this.chartData.forEach(d => totals.push(d[Object.keys(d)[0]].countries.Armenia.today_new_confirmed) );
                break;
            case 'active':
                this.chartData.forEach(d => totals.push(d[Object.keys(d)[0]].countries.Armenia.today_open_cases) );
                break;
            case 'newDeaths':
                this.chartData.forEach(d => totals.push(d[Object.keys(d)[0]].countries.Armenia.today_new_deaths) );
                break;
            case 'deaths':
                this.chartData.forEach(d => totals.push(d[Object.keys(d)[0]].countries.Armenia.today_deaths) );
                break;
            case 'recovered':
                this.chartData.forEach(d => totals.push(d[Object.keys(d)[0]].countries.Armenia.today_recovered) );
                break;
            case 'newRecovered':
                this.chartData.forEach(d => totals.push(d[Object.keys(d)[0]].countries.Armenia.today_new_recovered) );
                break;                
            default:
                this.chartData.forEach(d => totals.push(d[Object.keys(d)[0]].countries.Armenia.today_confirmed) );
                break;
        }
        

        this.renderChart({
            labels: dates,
            datasets: [{
                label: this.label,
                data: totals,
                backgroundColor: this.colors[Math.round(Math.random() * 15)]
            }],
            
        },
        this.options)
    }
}
</script>