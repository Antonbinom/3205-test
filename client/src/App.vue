<template>
  <v-app>
    <v-main>
      <v-container class="d-flex justify-center pt-10">
        <v-responsive max-width="400">
          <v-card class="pa-5">
            <div class="text-h5 text-center mb-4">Form</div>
            <form>
              <v-text-field
                v-model="state.email"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
                label="E-mail"
                required
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
                class="mb-1"
              ></v-text-field>

              <v-text-field
                v-model="state.number"
                label="Phone Number"
                v-mask="'##-##-##'"
                class="mb-1"
              ></v-text-field>

              <v-btn class="w-100" flat border @click="submitForm">
                submit
              </v-btn>
            </form>
          </v-card>
          <ResultsComponent :users="users" :loading="loading" />
        </v-responsive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import axios from "axios";

const initialState = {
  number: "",
  email: "",
};

const state = reactive({
  ...initialState,
});

const users = ref([]);
const loading = ref(false);
const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, state);

const clear = () => {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
};

const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  const body = {
    email: state.email,
    ...(state.number && { number: state.number.replaceAll("-", "") }),
  };
  loading.value = true;
  users.value = [];
  console.log(1);
  const { data } = await axios.post("http://localhost:5000/users/", body);
  users.value = data;
  clear();
  loading.value = false;
};
</script>
