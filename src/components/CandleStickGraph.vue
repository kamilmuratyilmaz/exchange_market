<template>
  <v-container>
    <v-btn @click="btnClick">Click</v-btn>
    <div ref="chart" class="chart"></div>
  </v-container>
</template>

<script>
import * as d3 from "d3";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "CandleStickGraph",
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "marketData",
      "timeSeries",
      "timeSeriesTypeData",
      "companySymbol",
    ]),
    sendQuery() {
      return this.$route.query.view;
    },
    sendId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions([
      "timeSeriesType",
      "companySymbolFromID",
      "getTimeSeriesData",
    ]),
    ...mapMutations(["SET_MARKET_DATA", "SET_TIME_SERIES"]),
    btnClick() {
      this.getTimeSeriesData();
    },
    checkTimeSeriesFromQuery() {
      this.companySymbolFromID(this.sendId);
      switch (this.sendQuery) {
        case "daily":
          this.timeSeriesType("TIME_SERIES_DAILY");
          break;
        case "weekly":
          this.timeSeriesType("TIME_SERIES_WEEKLY");
          break;
        case "monthly":
          this.timeSeriesType("TIME_SERIES_MONTHLY");
          break;
      }
      console.log(this.timeSeries);
      console.log(this.timeSeriesTypeData);
      console.log(this.companySymbol);
    },
    CandlestickChart(
      data,
      {
        date = (d) => d.date, // given d in data, returns the (temporal) x-value
        open = (d) => d.open, // given d in data, returns a (quantitative) y-value
        close = (d) => d.close, // given d in data, returns a (quantitative) y-value
        high = (d) => d.high, // given d in data, returns a (quantitative) y-value
        low = (d) => d.low, // given d in data, returns a (quantitative) y-value
        title, // given d in data, returns the title text
        marginTop = 70, // top margin, in pixels
        marginRight = 30, // right margin, in pixels
        marginBottom = 30, // bottom margin, in pixels
        marginLeft = 40, // left margin, in pixels
        width = 640, // outer width, in pixels
        height = 400, // outer height, in pixels
        xDomain, // array of x-values (defaults to every weekday)
        xRange = [marginLeft + 20, width - marginRight], // [left, right]
        xPadding = 0.3,
        xTicks, // array of x-values to label (defaults to every other Monday)
        yType = d3.scaleLinear, // type of y-scale
        yDomain, // [ymin, ymax]
        yRange = [height - marginBottom - 30, marginTop], // [bottom, top]
        xFormat = "%b %-d", // a format specifier for the date on the x-axis
        yFormat = "~f", // a format specifier for the value on the y-axis
        yLabel, // a label for the y-axis
        stroke = "currentColor", // stroke color for the daily rule
        strokeLinecap = "square", // stroke line cap for the rules
        colors = ["#4daf4a", "#999999", "#e41a1c"], // [up, no change, down]
      } = {}
    ) {
      // Compute values.
      const X = d3.map(data, date);
      const Yo = d3.map(data, open);
      const Yc = d3.map(data, close);
      const Yh = d3.map(data, high);
      const Yl = d3.map(data, low);
      const I = d3.range(X.length);
      const weeks = (start, stop, stride) =>
        d3.utcMonday.every(stride).range(start, +stop + 1);
      const weekdays = (start, stop) =>
        d3
          .utcDays(start, +stop + 1)
          .filter((d) => d.getUTCDay() !== 0 && d.getUTCDay() !== 6);
      // Compute default domains and ticks.
      if (xDomain === undefined) xDomain = weekdays(d3.min(X), d3.max(X));
      if (yDomain === undefined) yDomain = [d3.min(Yl), d3.max(Yh)];
      if (xTicks === undefined)
        xTicks = weeks(d3.min(xDomain), d3.max(xDomain), 2);
      // Construct scales and axes.
      // If you were to plot a stock using d3.scaleUtc, you’d see distracting gaps
      // every weekend. This chart therefore uses a d3.scaleBand whose domain is every
      // weekday in the dataset. A few gaps remain for holiday weekdays, such as
      // Christmas, but these are infrequent and allow the labeling of Mondays. As a
      // band scale, we specify explicit tick values.
      const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
      const yScale = yType(yDomain, yRange);
      const xAxis = d3
        .axisBottom(xScale)
        .tickFormat(d3.utcFormat(xFormat))
        .tickValues(xTicks);
      const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
      // Compute titles.
      if (title === undefined) {
        const formatDate = d3.utcFormat("%B %-d, %Y");
        const formatValue = d3.format(".2f");
        const formatChange = (
          (f) => (y0, y1) =>
            f((y1 - y0) / y0)
        )(d3.format("+.2%"));
        title = (i) => `${formatDate(X[i])}
Open: ${formatValue(Yo[i])}
Close: ${formatValue(Yc[i])} (${formatChange(Yo[i], Yc[i])})
Low: ${formatValue(Yl[i])}
High: ${formatValue(Yh[i])}`;
      } else if (title !== null) {
        const T = d3.map(data, title);
        title = (i) => T[i];
      }
      const svg = d3
        .select(this.$refs.chart)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .call((g) => g.select(".domain").remove());
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("stroke-opacity", 0.2)
            .attr("x2", width - marginLeft - marginRight)
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel)
        );
      const g = svg
        .append("g")
        .attr("stroke", stroke)
        .attr("stroke-linecap", strokeLinecap)
        .selectAll("g")
        .data(I)
        .join("g")
        .attr("transform", (i) => `translate(${xScale(X[i])},0)`);
      g.append("line")
        .attr("y1", (i) => yScale(Yl[i]))
        .attr("y2", (i) => yScale(Yh[i]));
      g.append("line")
        .attr("y1", (i) => yScale(Yo[i]))
        .attr("y2", (i) => yScale(Yc[i]))
        .attr("stroke-width", xScale.bandwidth())
        .attr("stroke", (i) => colors[1 + Math.sign(Yo[i] - Yc[i])]);
      if (title) g.append("title").text(title);
    },
    //Invoking the CanclestickChart function with the computed marketData to create the chart and add it to DOM
    makeChart() {
      this.CandlestickChart(this.marketData, {
        date: (d) => new Date(d.date),
        high: (d) => d.high,
        low: (d) => d.low,
        open: (d) => d.open,
        close: (d) => d.close,
        xDomain: this.marketData.map((item) => new Date(item.date)).reverse(),
        xTicks: this.marketData
          .map((item) => new Date(item.date))
          .filter((item, index) => {
            if (index % 7 === 0) return item;
          }),
        yDomain: [
          Math.min(...this.marketData.map((item) => item.low)),
          Math.max(...this.marketData.map((item) => item.high)),
        ],
        yLabel: "↑ Price ($)",
        width: 1200,
        height: 550,
      });
    },
  },
  watch: {
    sendQuery() {
      this.checkTimeSeriesFromQuery();
      this.getTimeSeriesData();
    },
    marketData() {
      while (this.$refs.chart.firstChild) {
        this.$refs.chart.firstChild.remove();
      }
      this.makeChart();
    },
  },
  mounted() {
    //Invoking the makeChart function when the component mounts
    this.checkTimeSeriesFromQuery();
    this.getTimeSeriesData();
    this.makeChart();
  },
};
</script>
<style scoped>
.chart {
  position: relative;
  padding: 30px;
  border-radius: 10px;
  background-color: white;
}
</style>
