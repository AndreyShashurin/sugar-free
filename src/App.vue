<template>
	<Toast />
	<header>
		<div class="navbar-header">
			<div class="container-fluid">
				<div class="float-end">
					<MegaMenu :model="megaMenu" />
				</div>
				<div>
					<div class="navbar-brand-box">
						
					</div>
				</div>
			</div>
		</div>
	</header>
	<div class="main-content-wrap" v-if="isToken">
		<div class="overview-content-wrap card-box-style"></div>
	</div>
	
	<router-view/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Toast from 'primevue/toast';
import Menubar from 'primevue/menubar';
import MegaMenu from 'primevue/megamenu';
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";

export default defineComponent({
  name: 'App',
  components: {
    Menubar,
	MegaMenu,
	Toast
  },
  data () {
    return {
        }
  },

  setup() {
    const store = useStore();
    const toast = useToast();
	const isAuth = store.dispatch("auth/checkToken")
	const isToken = !!localStorage.getItem('accessToken')
	const megaMenu = [
                {
                    label: 'Videos', icon: 'pi pi-fw pi-video',
                    items: [
                        [
                            {
                                label: 'Video 1',
                                items: [{label: 'Video 1.1'}, {label: 'Video 1.2'}]
                            },
                            {
                                label: 'Video 2',
                                items: [{label: 'Video 2.1'}, {label: 'Video 2.2'}]
                            }
                        ],
                        [
                            {
                                label: 'Video 3',
                                items: [{label: 'Video 3.1'}, {label: 'Video 3.2'}]
                            },
                            {
                                label: 'Video 4',
                                items: [{label: 'Video 4.1'}, {label: 'Video 4.2'}]
                            }
                        ]
                    ]
                },
            ]
	const items = ref([
		{
			label:'File',
			icon:'pi pi-fw pi-file',
			items:[
							{
								label:'New',
								icon:'pi pi-fw pi-plus',
								items:[
									{
										label:'Bookmark',
										icon:'pi pi-fw pi-bookmark'
									},
									{
										label:'Video',
										icon:'pi pi-fw pi-video'
									}
								]
							},
							{
								label:'Delete',
								icon:'pi pi-fw pi-trash'
							},
							{
								separator:true
							},
							{
								label:'Export',
								icon:'pi pi-fw pi-external-link'
							}
						]
		},
		{
			label: 'Войти',
			icon:'pi pi-fw pi-power-off',
			to: '/login'
		},
		{
			label: 'Регистрация',
			icon:'pi pi-fw pi-power-off',
			to: '/signup'
		},
		{
			label: 'Выйти',
			icon:'pi pi-fw pi-power-off',
			command: () => {
				store.dispatch("auth/logout")
			}
		}
	]);
	return { isToken,items,megaMenu }
	},
    methods: {
	}
})
</script>

<style lang="scss" >

body {
    font-family: "Poppins", sans-serif;
}
header {    
	background-color: #ffffff;
    box-shadow: 0 0 20px 3px rgb(0 0 0 / 5%);
    border-radius: 30px;
    padding: 30px 20px;
    margin-top: 12px;
    margin-bottom: 30px;
	.navbar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		height: 70px;
		padding: 0 calc(24px / 2) 0 0;
	}
	.p-megamenu {
		background: none;
	}
}
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
.form-control {
    height: 60px;
    padding-left: 60px !important;
}
.card-box-style {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 15px rgb(0 0 0 / 2%);
    border-radius: 30px;
    padding: 30px;
    margin-bottom: 24px;
}
</style>