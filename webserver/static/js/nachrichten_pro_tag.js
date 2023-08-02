const ctxNachrichtenProTag = document.getElementById('nachrichten_pro_tag');

function getGradient(x, y) {
  gradient = ctxNachrichtenProTag.getContext("2d").createLinearGradient(0, x, 0, y);
  gradient.addColorStop(0, colors.green.half);
  gradient.addColorStop(0.25, colors.green.quarter);
  gradient.addColorStop(0.95, colors.green.zero);
  return gradient
}

nachrichten_pro_tag_labels = []
nachrichten_pro_tag_values = []
nachrichten_pro_tag_chart.forEach(element => {
  nachrichten_pro_tag_labels.push(element[0]);
  nachrichten_pro_tag_values.push(element[1]);
});

const chartNachrichtenProTag = new Chart(ctxNachrichtenProTag, {
  type: 'line',
  data: {
    labels: nachrichten_pro_tag_labels,
    datasets: [{
      data: nachrichten_pro_tag_values,
      borderWidth: 2.5,
      borderColor: colors.green.default,
      pointBorderColor: colors.green.default,
      pointBackgroundColor: colors.green.default,
      pointHoverBackgroundColor: colors.green.default,
      pointHoverBorderColor: colors.green.default,
      pointBorderWidth: 2,
      pointHoverRadius: 3,
      pointHoverBorderWidth: 1,
      pointRadius: 2,
      backgroundColor: getGradient(25, 100),
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
        color: "#FFFFFF",
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
      },
    }
  }
});