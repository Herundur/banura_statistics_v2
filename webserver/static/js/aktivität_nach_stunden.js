const ctxAktivitätNachStunden = document.getElementById('aktivität_nach_stunden');

const inputAktivitätNachStunden = [1, 0, 0, 0, 2, 10, 50, 10, 20, 10, 2, 2]

const shortLabels = ["0:00-1:59", "2:00-3:59", "4:00-5:59", "6:00-7:59", "8:00-9:59", "10:00-11:59", "12:00-13:59", "14:00-15:59", "16:00-17:59", "18:00-19:59", "20:00-21:59", "22:00-23:59"]
aktivität_nach_stunden_labels = []
aktivität_nach_stunden_values = []
aktivität_nach_stunden_chart.forEach(element => {
  aktivität_nach_stunden_labels.push(element[0]);
  aktivität_nach_stunden_values.push(element[1]);
});

const chartAktivitätNachStunden = new Chart(ctxAktivitätNachStunden, {
  type: 'bar',
  data: {
    labels: aktivität_nach_stunden_labels,
    datasets: [{
      data: aktivität_nach_stunden_values,
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
          return ["0-2", "2-4", "4-6", "6-8", "8-10", "10-12", "12-14", "14-16", "16-18", "18-20", "20-22", "22-24"][context.dataIndex]; //return context.chart.data.labels[context.dataIndex]; 
        },
        color: "rgba(255, 255, 255, 0.85)",
        font: {
          family: "Readex Pro",
        },
        rotation: 270,
      }
    },
    {
      data: getOpposite(aktivität_nach_stunden_values),
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