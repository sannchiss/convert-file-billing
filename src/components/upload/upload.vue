<template>
<v-container>

    <div>
        <vue-html2pdf
        :show-layout="false"
        :margin="0" 
        :float-layout="true" 
        :enable-download="false" 
        :preview-modal="true" 
        :paginate-elements-by-height="1400" 
        filename="hee hee" :pdf-quality="2" 
        :manual-pagination="false" 
        pdf-format="a4" 
        pdf-orientation="portrait" 
        pdf-content-width="800px"
        @progress="onProgress($event)" 
        @hasStartedGeneration="hasStartedGeneration()" 
        @hasGenerated="hasGenerated($event)"
        @startPagination="beginPrint()"
        @beforeDownload="beforeDownload($event)"
        ref="html2Pdf">
        <section slot="pdf-content">

        <section class="pdf-item">
            
                <contentToPrint style="margin:20px"/>
            
            <!--add table hmtl-->
            <table class="table table-bordered table-items-billing">
                <thead>
                    <tr>
                        <th >ART.</th>
                        <th>CANTIDAD</th>
                        <th>DESCRIPCIÓN</th>
                        <th>PRECIO UNIT.</th>
                        <th>TOTALES</th>
                    </tr>
                    <tr>
                        <th>COD.</th>
                        <th>QUANTITY</th>
                        <th>DESCRIPTION</th>
                        <th>UNIT. PRICE</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.name">
                        <td >{{ item.name }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.name }}</td>
                    </tr>
                </tbody>
            </table>



            





        </section>



        <!--
            After this element below, the page will break and any elements after
            <div class="html2pdf__page-break"/> will go to the next page.
        -->
        <div class="html2pdf__page-break" />

        <section class="pdf-item">
            <h4>
                <contentToPrint />
                
            </h4>

           <!--  <span>
                Value
            </span> -->
        </section>


        <div class="html2pdf__page-break" />

        <section class="pdf-item">
            <h4>
                Pagina 3
            </h4>

            <!-- <span>
                Value
            </span> -->
        </section>



        </section>
        </vue-html2pdf>
    </div>

    <v-row>

        <v-col cols="20">

            <v-card>

                <v-card-title>
                    {{ title }}
                </v-card-title>

                <v-card-text>

                    <v-row>

                        <v-col md="15">

                            <v-file-input v-model="$store.state.file" prepend-icon="mdi-paperclip" accept="txt/*" label="File account Txa" show-size @change="onFileChange">
                            </v-file-input>

                        </v-col>

                        <v-col md="15">

                            <v-btn :loading="$store.state.loading" color="blue-grey" class="ma-2 white--text" v-on:click.prevent="generateReport">
                                Upload
                                <v-icon right dark>
                                    mdi-cloud-upload
                                </v-icon>
                            </v-btn>

                        </v-col>

                    </v-row>

                </v-card-text>

                <v-card-text>

                </v-card-text>

            </v-card>

        </v-col>

    </v-row>

</v-container>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

import VueHtml2pdf from 'vue-html2pdf'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {

    data: () => ({
        title: 'Upload file .txt',
        items: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
    }),
    methods: {
        onFileChange(file) {

            this.$store.commit('setFile', file)

        },

        generateReport() {

            this.$refs.html2Pdf.generatePdf()

        },

        onProgress(progress) {

            console.log(progress)

        },

        hasStartedGeneration() {

            console.log('Started')

        },

        hasGenerated(pdf) {

            console.log('Generated')

        },

        beginPrint() {

            console.log('Begin print')

        },

        beforeDownload(pdf) {

            console.log('Before download')

        },

        

    },
    components: {
        VueHtml2pdf,
        contentToPrint: require('@/components/upload/contentToPrint.vue').default,

    }

}
</script>

<style lang="scss">

// add style table
 @import '~vuetify/src/styles/styles.sass';

.pdf-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.on-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
} 

// add style table-items-billing
.table-items-billing {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    border-spacing: 0;
    border: 1px solid #1b1919;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    thead {
      th {
        text-align: left;
        font-size: 11px;
        padding: 8px;
        border-bottom: 1px solid #e0e0e0;
      }
    }
    tbody {
      tr {
        border-bottom: 1px solid #e0e0e0;
        td {
          padding: 8px;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }







</style>
