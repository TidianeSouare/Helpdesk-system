<template>
  <section>
    <EntryForm
      title="Add New Helpdesk Response"
      button-text="Create Entry"
      :initial-data="formData"
      @submit="saveEntry"
    />
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import EntryForm from "../components/EntryForm.vue";
import api from "../services/api";

const router = useRouter();

const formData = reactive({
  issueCode: "",
  responseText: "",
  category: "",
  priority: "",
  notes: ""
});

const saveEntry = async (payload) => {
  try {
    await api.createEntry(payload);
    router.push("/entries");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to create entry.");
  }
};
</script>