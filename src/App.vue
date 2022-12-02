<template>
  <Menubar :model="items">
    <template #start>
      <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="mr-2">
    </template>
    <template #end>
		<MegaMenu :model="megaMenu" />
    </template>
  </Menubar>
  <router-view/>
</template>

<script>
import { defineComponent, ref } from 'vue'

import Menubar from 'primevue/menubar';
import MegaMenu from 'primevue/megamenu';
import store from './store';

export default defineComponent({
  name: 'App',
  components: {
    Menubar,
	MegaMenu 
  },
  data () {
    return {
        }
  },

  setup() {
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
	return { items,megaMenu }
	},
    methods: {
	}
})
</script>

<style scoped>
.params {
    background: #dad8d3;
    border-bottom: solid 1px gainsboro;
    display: flex;
    align-items: center;
}
</style>