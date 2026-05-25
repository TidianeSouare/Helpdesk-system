<template>
  <form @submit.prevent="handleSubmit" class="card form-card">
    <h2>{{ title }}</h2>

    <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>

    <div class="form-group">
      <label for="issueCode">Issue Code</label>
      <input
        id="issueCode"
        v-model="form.issueCode"
        type="text"
        placeholder="e.g. PWD_RESET"
      />
    </div>

    <div class="form-group">
      <label for="responseText">Standard Response</label>
      <textarea
        id="responseText"
        v-model="form.responseText"
        rows="5"
        placeholder="Enter the standard helpdesk response"
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="form.category">
          <option value="">Select category</option>
          <option>Accounts</option>
          <option>Billing</option>
          <option>Network</option>
          <option>Email</option>
          <option>Hardware</option>
          <option>Software</option>
          <option>General Support</option>
        </select>
      </div>

      <div class="form-group">
        <label for="priority">Priority</label>
        <select id="priority" v-model="form.priority">
          <option value="">Select priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label for="notes">Notes</label>
      <textarea
        id="notes"
        v-model="form.notes"
        rows="3"
        placeholder="Optional extra notes or escalation guidance"
      ></textarea>
    </div>

    <div class="button-row">
      <button class="btn primary" type="submit">
        {{ buttonText }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, ref } from "vue";

const props = defineProps({
  title: { type: String, default: "Entry Form" },
  buttonText: { type: String, default: "Save Entry" },
  initialData: {
    type: Object,
    default: () => ({
      issueCode: "",
      responseText: "",
      category: "",
      priority: "",
      notes: ""
    })
  }
});

const emit = defineEmits(["submit"]);
const errorMessage = ref("");

const form = reactive({
  issueCode: "",
  responseText: "",
  category: "",
  priority: "",
  notes: ""
});

watch(
  () => props.initialData,
  (newValue) => {
    form.issueCode = newValue.issueCode || "";
    form.responseText = newValue.responseText || "";
    form.category = newValue.category || "";
    form.priority = newValue.priority || "";
    form.notes = newValue.notes || "";
  },
  { immediate: true }
);

const handleSubmit = () => {
  errorMessage.value = "";

  if (!form.issueCode.trim()) {
    errorMessage.value = "Issue code is required.";
    return;
  }

  if (!form.responseText.trim()) {
    errorMessage.value = "Standard response is required.";
    return;
  }

  if (!form.category) {
    errorMessage.value = "Category is required.";
    return;
  }

  if (!form.priority) {
    errorMessage.value = "Priority is required.";
    return;
  }

  emit("submit", {
    issueCode: form.issueCode.trim().toUpperCase(),
    responseText: form.responseText.trim(),
    category: form.category,
    priority: form.priority,
    notes: form.notes.trim()
  });
};
</script>