<template>
	<Toast />
	<header v-if="iaAuth">
		<div class="navbar-header">
		<Menubar :model="items">
			<template #start>
				<div class="navbar-brand-box">
					logo
				</div>
			</template>
			<template #item="{item}">
					<a :href="item.url">{{item.label}}</a>
			</template>
			<template #end>
				    <div class="profile-nav-item pt-0 pb-0">
                        <div class="avatar d-flex align-items-center">
                            <img src="https://imgholder.ru/48x48/8493a8/adb9ca&text=аватарка" class="avatar" alt="avatar">
					        <MegaMenu :model="megaMenu" />
                        </div>
                    </div>
			</template>
		</Menubar>
		</div>
	</header>
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
	data() {
		return 
	},
  setup() {
    const store = useStore();
    const toast = useToast();
	
  	store.dispatch('auth/checkToken')
	const iaAuth = store.state.auth.accessToken
	const megaMenu = [
                {
                    label: store.state.auth.user.name,
                    items: [
                        [
                            {
                                label: 'Профиль',
                            },
                            {
                                label: 'Настройки',
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
			url: '/login'
		},
		{
			label: 'Регистрация',
			icon:'pi pi-fw pi-power-off',
			url: '/signup'
		},
		{
			label: 'Выйти',
			icon:'pi pi-fw pi-power-off',
			command: () => {
				store.dispatch("auth/logout")
			}
		}
	]);
	return { iaAuth,items,megaMenu }
	},
    methods: {
	}
})
</script>

<style lang="scss" scoped>

body {
    font-family: "Poppins", sans-serif;
	font-size: 16px;
	color: #292d32;
}
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    font-family: "Poppins", sans-serif;
	font-size: 16px;
	color: #292d32;

}
header {    
	background-color: #ffffff;
    box-shadow: 0 0 20px 3px rgb(0 0 0 / 5%);
    border-radius: 30px;
    padding: 30px 20px;
    margin-top: 12px;
    margin-bottom: 30px;
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
.avatar {
    margin-right: 15px;
    border-radius: 18px;
}
</style>