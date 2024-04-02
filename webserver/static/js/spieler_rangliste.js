const ctxSpielerRangliste = document.getElementById('spieler_rangliste');

spieler_rangliste_chart_labels = []
spieler_rangliste_chart_values = []
/*
spieler_rangliste_chart.forEach(element => {
  spieler_rangliste_chart_labels.push(element[0]);
  spieler_rangliste_chart_values.push(element[1]);
});
*/
for (let i = 0; i < spieler_rangliste_chart.length; i++) {
  let icon;
  switch (i + 1) {
    case 1:
      icon = "🥇";
      break;
    case 2:
      icon = "🥈";
      break;
    case 3:
      icon = "🥉";
      break;
    default:
      icon = " " + (i + 1) + ".";

  } 
  const label = icon + " " + spieler_rangliste_chart[i][0];
  spieler_rangliste_chart_labels.push(label);
  spieler_rangliste_chart_values.push(spieler_rangliste_chart[i][1]);
}


const chartSpielerRangliste = new Chart(ctxSpielerRangliste, {
  type: 'bar',
  data: {
    labels: spieler_rangliste_chart_labels,
    datasets: [{
      data: spieler_rangliste_chart_values,
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

