<template>
  <input type="text" class="form-control" :value="modelValue" @input="updateInput" />
</template>
<script setup>
const props = defineProps({
  modelValue: [String, Number],
});
const emit = defineEmits();
const updateInput = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>
<style></style>
