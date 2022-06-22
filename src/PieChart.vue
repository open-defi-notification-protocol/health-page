<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
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
