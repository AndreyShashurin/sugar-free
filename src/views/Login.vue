<template>
  <div class="account-area">
      <div class="flex justify-content-center">
          <div class="account-content">
              <div class="account-header">
                  <h3>Авторизация</h3>
               </div>
              <form @submit.prevent="handleSubmit(!v$.$invalid)" class="account-wrap">     
                  <div class="form-group mb-24 icon p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText type="text" id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error" class="form-control" />
                  </div>                  
                  <div class="form-group mb-24 icon p-input-icon-left">
                      <Password id="password" :inputClass="'form-control'" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                      </Password>
                  </div>
                  <div class="form-group mb-24">
                      <Button type="submit" label="Войти" class="mt-2" />
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const toast = useToast();
    const showSuccess = () => {
      toast.add({severity:'success', summary: 'Info Message', detail:'Message Content', life: 3000});
    }
    return {
      showSuccess,
      store,
      toast,
      v$: useVuelidate()
    }
  },
  data() {
    return {
      email: '',
      password: '',
      submitted: false,
      showMessage: false
    }
  },
validations() {
  return {
    email: {
      required,
      email
    },
    password: {
        required
    },
  }
},
methods: {
  /*handleRegister(): void {
    const user = {
      password: this.password,
      email: this.email
    };
    this.$store.dispatch("auth/login", user).then(
      (data: any) => {
        this.showSuccess();
        this.resetForm()
      },
      (error: any) => { 
      }
    );
  },
  handleSubmit(isFormValid: boolean) {
      this.submitted = true;
      this.handleRegister()
  },
  resetForm(): void {
        this.email = '';
        this.password = '';
      this.submitted = false;
  }*/
}
}
</script>

<style lang="scss" scoped>
.form-group {
  &.mb-24 {
      width: 100%;
      margin-bottom: 24px;
  }
  .p-password {
      width: 100%;
  }
  &.icon .pi {
      position: absolute;
      top: 32px;
      left: 20px;
  }
}
.account-area {
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  background: rgb(39,127,224);
  background: linear-gradient(135deg, rgba(39,127,224,1) 0%, rgba(51,152,192,1) 41%, rgba(63,176,172,1) 100%);
}
.account-content {
  max-width: 510px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 50px;
}
.account-header {
  text-align: center;
  h3 {
      margin-bottom: 30px;
      padding-top: 30px;
      font-size: 20px;
  }
}
.account-wrap .p-button{
  color: #ffffff;
  width: 100%;
  padding: 23px 20px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  transition: all ease 0.5s;
  text-align: center;
  border: none;
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: inline-table;
  background-color: #1765FD;
  border-radius: 10px;
}

</style>