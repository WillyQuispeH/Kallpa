const options = {
  responsive: true,
  animation: {
    duration: 1000,
  },

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    y: {
      min: 0,
      max: 20,
    },
    x: {
      ticks: {
        color: "black",
      },
    },
  },
};
const colors = [
  "#FABFB7",
  "#FDF9C4",
  "#FFDA9E",
  "#C5C6C8",
  "#B2E2F2",
  "#B0C2F2",
  "#FABFB7",
  "#FDF9C4",
  "#FFDA9E",
  "#C5C6C8",
  "#B2E2F2",
  "#B0C2F2",
];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];



export { options, colors, meses };
