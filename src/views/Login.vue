<template>
    Login
        <div class="col-md-12">
          <div class="card card-container">
            <img
              id="profile-img"
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              class="profile-img-card"
            />
            
            <Form @submit="handleRegister" :validation-schema="schema">
              <div v-if="!successful">
                <div class="form-group">
                  <label for="username">Username</label>
                  <Field name="username" type="text" class="form-control" />
                  <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <Field name="email" type="email" class="form-control" />
                  <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <Field name="password" type="password" class="form-control" />
                  <ErrorMessage name="password" class="error-feedback" />
                </div>
      
                <div class="form-group">
                  <button class="btn btn-primary btn-block" :disabled="loading">
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    Sign Up
                  </button>
                </div>
              </div>
            </Form>
      
            <div
              v-if="message"
              class="alert"
              :class="successful ? 'alert-success' : 'alert-danger'"
            >
              {{ message }}
            </div>
          </div>
        </div>
    </template>
    <script lang="ts">
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as yup from 'yup';
    import { Options, Vue } from 'vue-class-component'
      
    @Options({
      components: {
        Form,
        Field,
        ErrorMessage,
      },
      props: {
        msg: String
      },
      data() {
        return {
          message: "",
        }
      },
      computed: {
        loggedIn() {
          return this.$store.state.auth.accessToken;
        },
      },
      mounted() {
        if (this.loggedIn) {
          this.$router.push("/profile");
        }
      },
      methods: {
        handleRegister(user: any) {
          this.message = "";
          this.successful = false;
          this.loading = true;
          this.$store.dispatch("auth/register", user).then(
            (data: any) => {
              this.message = data.message;
              this.successful = true;
              this.loading = false;
            },
            (error: any) => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
              this.loading = false;
            }
          );
        },
      },
    })
    export default class Register extends Vue {
    
      data() {
        const schema = yup.object().shape({
          username: yup
            .string()
            .required("Username is required!")
            .min(3, "Must be at least 3 characters!")
            .max(20, "Must be maximum 20 characters!"),
          email: yup
            .string()
            .required("Email is required!")
            .email("Email is invalid!")
            .max(50, "Must be maximum 50 characters!"),
          password: yup
            .string()
            .required("Password is required!")
            .min(6, "Must be at least 6 characters!")
            .max(40, "Must be maximum 40 characters!"),
        });
        return {
          successful: false,
          loading: false,
          message: "",
          schema,
        };
      }
    }
    </script>
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
      h3 {
        margin: 40px 0 0;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        display: inline-block;
        margin: 0 10px;
      }
      a {
        color: #42b983;
      }
      </style>
      