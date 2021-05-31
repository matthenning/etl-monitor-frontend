<template>
    <v-row justify="center">
        <v-alert v-if="login_failed">Login failed</v-alert>
        <v-dialog v-model="dialog" persistent max-width="600px" overlay-opacity="1" overlay-color="primary" no-click-animation>
            <div class="custom-shape-divider-bottom-1620287819">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                </svg>
            </div>
            <v-card>
                <v-form v-model="valid" @submit.prevent="event.submit">
                    <v-card-text v-show="login_failed">
                        <v-container>
                            <v-alert outlined type="error">Login failed.</v-alert>
                        </v-container>
                    </v-card-text>
                    <v-card-text class="align-content-center">
                        <img alt="Logo" src="/assets/img/logo_w_text.png" />
                    </v-card-text>
                    <v-card-text>
                        <v-container>
                            <ValidationObserver :ref="validation._ref" v-slot="{ validate, reset }">
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <ValidationProvider v-slot="{ errors }" name="E-Mail" :rules="validation.email">
                                            <v-text-field v-model="form.email" label="E-Mail" :error-messages="errors"> </v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <ValidationProvider v-slot="{ errors }" name="Password" :rules="validation.password">
                                            <v-text-field v-model="form.password" label="Password" type="password" :error-messages="errors"> </v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                </v-row>
                            </ValidationObserver>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit">Login</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import Form from "../../components/forms/Form";
    import FormActionEnum from "../../components/forms/FormActionEnum";
    import axios from "axios";
    import Link from "@/util/Link";
    import ErrorParser from "@/util/ErrorParser";

    export default {

        extends: Form,

        data () {
            return {
                login_failed: false,
                dialog: false,
                redirect: {
                    success: () => this.$router.back()
                },
                submit: {
                    action: FormActionEnum.AUTH,
                    url_override: Link.base('login')
                },
                event: {
                    submit: () => {
                        axios.get(Link.base('sanctum/csrf-cookie')).then(() => {
                            axios.post(Link.base('login'), this.form).then(() => {
                                this.redirect.success()
                            }).catch((error) => {
                                this.event.error(ErrorParser.parse(error))
                            })
                        })
                    }
                },
                form: {
                    email: null,
                    password: null,
                },
                validation: {
                    _ref: 'login-observer',
                    email: 'required|email',
                    password: 'required'
                }
            }
        },

        mounted () {
            this.dialog = true
        },

        methods: {
            onError (e) {
                this.login_failed = true
            },

            onSuccess () {
                this.login_failed = false
                parent.onSubmit()
            }
        }

    }
</script>
