<script>
import { PolarArea } from 'vue-chartjs'

export default {
  extends: PolarArea,
  props:['chartData','options'],
  methods: {
    update() {
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
};
</script>
