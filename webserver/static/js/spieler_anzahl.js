const ctxSpielerAnzahl = document.getElementById('spieler_anzahl');

new Chart(ctxSpielerAnzahl, {
  type: 'line',
  data: {
    labels: ["30 April 2023", 1.5, 2.5, 3.5, 4.5, 5.5 , 6.5],
    datasets: [{
      data: [90, 90, 90, 91, 91, 91 ,91],
      borderWidth: 2.5,
      borderColor: colors.green.default,
      backgroundColor: gradient,
      fill: true,
      lineTension: 0.2,
    }]
  },
  options: {
    interaction: {
      mode: 'nearest'
    },
    elements: {
      point: {
        backgroundColor: "rgba(1, 10, 1, 1)",
        pointRadius: 2,
        color: "#FFFFFF",
        hitRadius: 20,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        beginAtZero: true,
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
      },
    }
  }
});