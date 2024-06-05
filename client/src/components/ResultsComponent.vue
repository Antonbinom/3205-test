<template>
  <v-card class="mt-10 pa-5 text-center">
    <div class="text-h5 text-center mb-4">Results</div>
    <v-divider :thickness="2"></v-divider>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">№</th>
          <th class="text-center">Email</th>
          <th class="text-center">number</th>
        </tr>
      </thead>
      <tbody v-if="users.length">
        <tr v-for="(user, index) in users" :key="user.email + user.number">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ user.email }}</td>
          <td class="text-center">{{ user.number }}</td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="!users.length && !loading" class="text-center pt-5">Empty</div>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
      class="mt-5"
    ></v-progress-circular>
  </v-card>
</template>

<script setup>
const props = defineProps({
  users: Array,
  loading: Boolean,
});
</script>
