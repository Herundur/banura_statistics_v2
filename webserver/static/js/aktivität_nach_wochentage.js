const ctxAktivitätNachWochentage = document.getElementById('aktivität_nach_wochentage');

const verticalBarGradient = ctxAktivitätNachWochentage.getContext("2d").createLinearGradient(0, 0, 0, 170);
verticalBarGradient.addColorStop(0, "#3f8108");
verticalBarGradient.addColorStop(1, "#65d30e");

Chart.register(ChartjsPluginStacked100.default)

aktivität_nach_wochentage_labels = []
aktivität_nach_wochentage_values = []
aktivität_nach_wochentage_chart.forEach(element => {
  aktivität_nach_wochentage_labels.push(element[0]);
  aktivität_nach_wochentage_values.push(element[1]);
});

new Chart(ctxAktivitätNachWochentage, {
  type: 'bar',
  data: {
    labels: aktivität_nach_wochentage_labels,
    datasets: [{
      data: aktivität_nach_wochentage_values,
      backgroundColor: verticalBarGradient,
      fill: true,
      borderRadius: [
        { topLeft: 5, topRight: 5, bottomLeft: 5, bottomRight: 5 },
    ],
      borderSkipped: false,
      datalabels: {
        align: 'end',
        anchor: 'start',
        formatter: function(value, context) {
          return context.chart.data.labels[context.dataIndex][0];
        },
        color: "rgba(255, 255, 255, 0.85)",
        font: {
          family: "Readex Pro"

        },
      }
    },
    {
      data: getOpposite(aktivität_nach_wochentage_values),
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: [
        { topLeft: 5, topRight: 5, bottomLeft: 5, bottomRight: 5 },
      ],
      fill: true,
      borderSkipped: false,
      datalabels: {
        display: false,
      }
    }]
  },
  plugins: [ChartDataLabels],
  options: {
    interaction: {
      mode: 'nearest'
    },
    elements: {
      point: {
        pointRadius: 2,
        hitRadius: 20,
      },
    },
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
      stacked100: {
        enable: true,
        replaceTooltipLabel: false,
      },
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
            if (context.datasetIndex != 0) {
              const largestNum = Math.max(...context.chart.data.datasets[0].data);
              label += (largestNum - context.raw) + " Nachrichten";
              return label;
            }
            label += context.raw +" Nachrichten";
            return label;
          }
        }
      },
    }
  }
});