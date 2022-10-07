<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">
      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col class="pl-15">
              <v-img src="../src/assets/FedEx-Express-logo.png" max-width="100"></v-img>
            </v-col>
          </v-row>
          <v-list-item-title class="text-center" color="blue">
            App developer by Sannchiss
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense rounded nav>

        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>
              mdi-home
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group v-for="item in items" :key="item.title" :v-model="item.active" :prepend-icon="item.icon">

          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.to" link>
            <v-list-item-icon>
              <v-icon>
                {{ subItem.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="subItem.title"></v-list-item-title>

          </v-list-item>
        </v-list-group>

      </v-list>

      <v-divider></v-divider>


    </v-navigation-drawer>

      <v-app-bar   
        app 
        color="purple darken-1" 
        prominent 
        height="200px" 
        
        >
      
        <v-container class="header-container pa-5">

        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          
          <v-spacer></v-spacer>
        
          <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
          <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>

        </v-row>

        <v-row class="pa-2 ml-10">

          <v-col cols="12" sm="12" md="12" lg="12" xl="12">
            <v-img src="../src/assets/FedEx-Express-logo.png" max-width="100"></v-img>
            <v-app-bar-title class="text-h4">
              Conversor de texto plano
            </v-app-bar-title>
          </v-col>

        </v-row>


      </v-container>

      </v-app-bar>



       <!-- Sizes your content based upon application components -->
       <v-main>

<!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      </v-main>


    <!-- 
    <v-footer app>
    </v-footer> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({

    drawer: null,
    items: [
      {
        title: 'My Music',
        icon: 'mdi-music',
        to: '/my-music',
        active: true,
        action: () => {
          this.$router.push('/my-music')
        },

      },
      {
        title: 'My Videos',
        icon: 'mdi-video',
        to: '/my-videos',
        action: () => {
          this.$router.push('/my-videos')
        },
      }

    ]
  }),
};
</script>

<style lang="sass">
  .header-container 
    max-width: none !important
  
  </style>
