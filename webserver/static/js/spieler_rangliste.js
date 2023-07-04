const ctxSpielerRangliste = document.getElementById('spieler_rangliste');

new Chart(ctxSpielerRangliste, {
  type: 'bar',
  data: {
    labels: ["Heredur", "Habschi", "Simon", "Mosi", "Fabi", "EWWww", "dick", "Nutzer8", "zzz" , "testestet"],
    datasets: [{
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
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