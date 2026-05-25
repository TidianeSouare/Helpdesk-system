<template>
  <section>
    <h1 class="page-title">Dashboard</h1>

    <div v-if="loading" class="card">Loading statistics...</div>
    <div v-else-if="error" class="alert error">{{ error }}</div>

    <template v-else>
      <div class="grid-3">
        <div class="card stat-card">
          <h3>Total Entries</h3>
          <p class="big-number">{{ stats.totalEntries }}</p>
        </div>

        <div class="card stat-card">
          <h3>Top Category</h3>
          <p class="big-number">{{ topCategory }}</p>
        </div>

        <div class="card stat-card">
          <h3>Most Common Priority</h3>
          <p class="big-number">{{ topPriority }}</p>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h2>Entries by Category</h2>
          <ul class="clean-list">
            <li v-for="item in stats.categories" :key="item._id">
              <strong>{{ item._id }}</strong> — {{ item.count }}
            </li>
          </ul>
        </div>

        <div class="card">
          <h2>Entries by Priority</h2>
          <ul class="clean-list">
            <li v-for="item in stats.priorities" :key="item._id">
              <strong>{{ item._id }}</strong> — {{ item.count }}
            </li>
          </ul>
        </div>
      </div>

      <div class="card">
        <h2>Most Used Responses</h2>
        <div v-if="stats.mostUsed.length === 0">No usage data yet.</div>
        <div v-else class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Issue Code</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Times Used</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in stats.mostUsed" :key="entry._id">
                <td>{{ entry.issueCode }}</td>
                <td>{{ entry.category }}</td>
                <td>{{ entry.priority }}</td>
                <td>{{ entry.timesUsed }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import api from "../services/api";

const stats = ref({
  totalEntries: 0,
  categories: [],
  priorities: [],
  mostUsed: []
});

const loading = ref(true);
const error = ref("");

const topCategory = computed(() => stats.value.categories[0]?._id || "N/A");
const topPriority = computed(() => stats.value.priorities[0]?._id || "N/A");

const loadStats = async () => {
  try {
    const response = await api.getStats();
    stats.value = response.data;
  } catch (err) {
    error.value = "Failed to load dashboard statistics.";
  } finally {
    loading.value = false;
  }
};

onMounted(loadStats);
</script>