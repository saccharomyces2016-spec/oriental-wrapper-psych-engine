<template>
  <div class="radar-wrapper">
    <div class="radar-glow"></div>
    <canvas id="radarChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['data', 'raw']);
let chartInstance = null;

onMounted(() => { renderChart(); });
watch(() => props.data, () => { renderChart(); });

const renderChart = () => {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;
  if (chartInstance) chartInstance.destroy();

  const rawData = props.raw || { metal:10, wood:10, water:10, fire:10, earth:10 };
  const finalData = props.data || { metal:20, wood:20, water:20, fire:20, earth:20 };
  const labels = ['金', '木', '水', '火', '土'];
  const valuesRaw = [rawData.metal, rawData.wood, rawData.water, rawData.fire, rawData.earth];
  const valuesFinal = [finalData.metal, finalData.wood, finalData.water, finalData.fire, finalData.earth];

  chartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [
        { label: '先天', data: valuesRaw, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.3)', borderWidth: 1, pointRadius: 0 },
        { label: '後天', data: valuesFinal, backgroundColor: 'rgba(168, 50, 50, 0.5)', borderColor: '#ff4d4d', borderWidth: 2, pointBackgroundColor: '#fff', pointBorderColor: '#a83232', pointRadius: 3 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.05)', circular: true },
          pointLabels: { color: '#d4af37', font: { family: "'Ma Shan Zheng', cursive", size: 18 } },
          ticks: { display: false, backdropColor: 'transparent' },
          beginAtZero: true, suggestedMax: 40
        }
      },
      plugins: { legend: { display: true, position: 'bottom', labels: { color: '#888', font: { family: "'Noto Serif TC', serif" }, usePointStyle: true } }, tooltip: { enabled: false } },
      animation: { duration: 2000, easing: 'easeOutQuart' }
    }
  });
};
</script>

<style scoped>
.radar-wrapper { position: relative; width: 100%; max-width: 400px; height: 400px; margin: 0 auto; }
.radar-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; height: 80%; background: radial-gradient(circle, rgba(168, 50, 50, 0.1) 0%, transparent 70%); z-index: -1; border-radius: 50%; filter: blur(20px); }
</style>