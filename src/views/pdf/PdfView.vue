<template>



  <div>
     <vue-html2pdf
     :show-layout="false"
    :float-layout="true"
    :enable-download="false"
    :preview-modal="true"
    filename="hehehe"
    :paginate-elements-by-height="1100"
    :pdf-quality="2"
    pdf-format="letter"
    pdf-orientation="portrait"
    pdf-content-width="800px"
    :manual-pagination="false"

    :margin-top="20"
    :margin-bottom="20"
    :margin-left="20"
    :margin-right="20"
    :margin-unit="mm"
    :pdf-content-height="1100"
  

    ref="html2Pdf"
   >
       <section slot="pdf-content">

        fgghfhg
       </section>
   </vue-html2pdf>


    <v-col md="15">
  
  <v-btn :loading="$store.state.loading" color="blue-grey" class="ma-2 white--text" v-on:click.prevent="generateReport">
      View Pdf
      <v-icon right dark>
          mdi-cloud-upload
      </v-icon>
  </v-btn>
  
  </v-col>

  </div>
</template>

<script>

import VueHtml2pdf from 'vue-html2pdf'

export default {

  data:() => {

  },

  methods: {

    generateReport () {

            this.$refs.html2Pdf.generatePdf()
        
          }

  },

  components: {
    VueHtml2pdf
  },


}
</script>

<style>

</style>