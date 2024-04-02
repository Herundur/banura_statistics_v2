const ctxChannelRangliste = document.getElementById('channel_rangliste');

const horizontalBarGradient = ctxChannelRangliste.getContext("2d").createLinearGradient(0, 0, 170, 0);
horizontalBarGradient.addColorStop(0, "#3f8108");
horizontalBarGradient.addColorStop(1, "#65d30e");

let channel_rangliste_chart_formatted = addRankingIcons(channel_rangliste_chart);
channel_rangliste_chart_labels = channel_rangliste_chart_formatted.labels;
channel_rangliste_chart_values = channel_rangliste_chart_formatted.values;

const chartChannelRangliste = new Chart(ctxChannelRangliste, {
  type: 'bar',
  data: {
    labels: channel_rangliste_chart_labels,
    datasets: [{
      data: channel_rangliste_chart_values,
      backgroundColor: horizontalBarGradient,
      fill: true,
      borderRadius: [
        { topLeft: 5, topRight: 5, bottomLeft: 5, bottomRight: 5 },
      ],
      borderSkipped: false,
      datalabels: {
        align: 'end',
        anchor: 'start',
        formatter: function(value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
        color: "rgba(255, 255, 255, 0.85)",
        font: {
          family: "Readex Pro"

        },
      }
    }]
  },
  plugins: [ChartDataLabels],
  options: {
    indexAxis: 'y',
    interaction: {
      mode: 'nearest'
    },
    elements: {
      point: {
        pointRadius: 2,
        hitRadius: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
      },
      
      x: {
        display: false,
      }
    },
    plugins:{
      legend: {
        display: false,
      },
      tooltip: {
        titleColor: "rgba(255, 255, 255, 0.90)",
        titleMarginBottom: 2,
        bodyColor: "rgba(255, 255, 255, 0.75)",
        backgroundColor: "#3b3b3b",
        displayColors: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            label += context.raw +" Nachrichten";
            return label;
          }
        }
      },
    }
  }
});