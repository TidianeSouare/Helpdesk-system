<template>
  <section>
    <div v-if="loading" class="card">Loading entry...</div>

    <EntryForm
      v-else
      title="Edit Helpdesk Response"
      button-text="Update Entry"
      :initial-data="formData"
      @submit="updateEntry"
    />
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import EntryForm from "../components/EntryForm.vue";
import api from "../services/api";

const route = useRoute();
const router = useRouter();
const loading = ref(true);

const formData = reactive({
  issueCode: "",
  responseText: "",
  category: "",
  priority: "",
  notes: ""
});

const loadEntry = async () => {
  try {
    const response = await api.getEntry(route.params.id);
    Object.assign(formData, response.data);
  } catch (err) {
    alert("Failed to load entry.");
    router.push("/entries");
  } finally {
    loading.value = false;
  }
};

const updateEntry = async (payload) => {
  try {
    await api.updateEntry(route.params.id, payload);
    router.push("/entries");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to update entry.");
  }
};

onMounted(loadEntry);
</script>