<template>
    <div class="account-area">
        <div class="flex justify-content-center">
            <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
                <div class="flex align-items-center flex-column pt-6 px-3">
                    <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
                    <h5>Поздравляем с регистрацией!</h5>
                    <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                        Ваш аккаунт зарегистрирован на имя <b>{{name}}</b> ; it'll be valid next 30 days without activation. Please check <b>{{email}}</b> for activation instructions.
                    </p>
                </div>
                <template #footer>
                    <div class="flex justify-content-center">
                        <Button label="OK" @click="toggleDialog" class="p-button-text" />
                    </div>
                </template>
            </Dialog>

            <div class="account-content">
                <div class="account-header">
                    <h3>Регистрация</h3>
                 </div>
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="account-wrap">
                    <div class="form-group mb-24 icon p-input-icon-left">
                        <i class="pi pi-user" />
                        <InputText type="text" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" placeholder="Имя" class="form-control" />
                        <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
                    </div>                    
                    <div class="form-group mb-24 icon p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText type="text" id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error" class="form-control" />
                    </div>                  
                    <div class="form-group mb-24 icon p-input-icon-left">
                        <Password id="password" :inputClass="'form-control'" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                            <template #header>
                                <h6>Pick a password</h6>
                            </template>
                            <template #footer="sp">
                                        {{sp.level}}
                                        <Divider />
                                        <p class="mt-2">Suggestions</p>
                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                            <li>At least one lowercase</li>
                                            <li>At least one uppercase</li>
                                            <li>At least one numeric</li>
                                            <li>Minimum 8 characters</li>
                                        </ul>
                            </template>
                        </Password>
                    </div>
                    <div class="form-group mb-24">
                        <Button type="submit" label="Зарегистрироваться" class="mt-2" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: '',
            email: '',
            password: '',
            submitted: false,
            showMessage: false
        }
    },
  validations() {
      return {
          name: {
              required
          },
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
    handleRegister() {
      const user = {
        username: this.name,
        password: this.password,
        email: this.email
      }
      this.$store.dispatch("auth/register", user).then(
        (data: any) => {
            this.toggleDialog();
        },
        (error: any) => {
          this.toggleDialog();
        }
      );
    },
      handleSubmit(isFormValid: boolean) {
          this.submitted = true;

          if (!isFormValid) {
            return;
          }
          this.handleRegister()
      },
      toggleDialog() {
          this.showMessage = !this.showMessage;
      
          if(!this.showMessage) {
            this.resetForm();
          }
      },
      resetForm() {
          this.name = '';
          this.email = '';
          this.password = '';
          this.submitted = false;
      }
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

  