<template>
<v-container>

    <div>
        <vue-html2pdf :show-layout="false" :margin="20" :float-layout="true" :enable-download="false" :preview-modal="true" :paginate-elements-by-height="1400" filename="hee hee" :pdf-quality="2" :manual-pagination="true" pdf-format="letter" pdf-orientation="portrait" pdf-content-width="800px" @progress="onProgress($event)" @hasStartedGeneration="hasStartedGeneration()" @hasGenerated="hasGenerated($event)" @startPagination="beginPrint()" @beforeDownload="beforeDownload($event)" ref="html2Pdf">
            <section slot="pdf-content">

                <section class="pdf-item">
                    <contentToPrint />

                    <v-row>
                        <div style="margin:-80px 30px">

                            <div id="label">
                                <span class="font_bold_m">Intl Air Waybill</span>
                                <div id="label_cont">
                                    <span class="font_normal">Intl Air Waybill</span>
                                </div>
                            </div>

                        </div>

                        <div style="margin:-80px 110px">

                            <div id="label">
                                <span class="font_bold_m">Bill D/T/F</span>
                                <div id="label_cont">
                                    <span class="font_normal">431591944</span>
                                </div>
                            </div>

                        </div>
                        <div style="margin:-80px 50px">

                            <div id="label">
                                <span class="font_bold_m">Currency</span>
                                <div id="label_cont">
                                    <span class="font_normal">USD</span>
                                </div>
                            </div>

                        </div>

                        <div style="margin:-80px 70px">

                            <div id="label">
                                <span class="font_bold_m">Customer References</span>
                                <div id="label_cont">
                                    <span class="font_normal">-</span>
                                </div>
                            </div>

                        </div>

                    </v-row>

                    <v-row>

                        <div style="margin: -20px 30px">

                            <div id="label">
                                <span class="font_bold_m">Terms of Sale</span>
                                <div id="label_cont">
                                    <span class="font_normal">FCA</span>
                                </div>
                            </div>

                        </div>

                        <div style="margin: -20px 110px">

                            <div id="label">
                                <span class="font_bold_m">Total Wgt</span>
                                <div id="label_cont">
                                    <span class="font_normal">12.50</span>
                                </div>
                            </div>

                        </div>

                        <div style="margin: -20px 50px">

                            <div id="label">
                                <span class="font_bold_m">Wgt Type</span>
                                <div id="label_cont">
                                    <span class="font_normal">KG</span>
                                </div>
                            </div>

                        </div>

                        <div style="margin: -20px 70px">

                            <div id="label">
                                <span class="font_bold_m">Total Packages</span>
                                <div id="label_cont">
                                    <span class="font_normal">2</span>
                                </div>
                            </div>

                        </div>

                    </v-row>

                    <v-row>

                        <!--Exporter/Shipper-->
                        <div style="margin: 20px 30px">

                            <div id="label">
                                <span class="font_bold_m">Exporter/Shipper</span>
                                <div id="label_cont">
                                    <span class="font_min_normal">Contact:</span>&nbsp;&nbsp;&nbsp;<span class="font_normal">CUSTOMER SERVICE</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Co Name:</span>&nbsp;<span class="font_normal">STEMS AND BUNCHES</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Address1:</span>&nbsp;<span class="font_normal">KALOS S.A</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Address2:</span>&nbsp;<span class="font_normal">BAF - IPD</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">City:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal">PARAGUAY</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">St/PV:</span><span class="font_normal">-</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Phone:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal">021 751-596</span>
                                </div>
                            </div>

                        </div>

                        <div style="margin: 130px 110px">
                            <div id="label_cont">
                                <span class="font_min_normal">Country/Territory:</span>&nbsp;<span class="font_normal">PY</span>
                            </div>
                        </div>

                        <div style="margin: 130px -60px">
                            <div id="label_cont">
                                <span class="font_min_normal">Postal:</span>&nbsp;<span class="font_normal">999998</span>
                            </div>
                        </div>

                        <!--Ship To (Consignee)-->
                        <div style="margin: 20px 100px">

                            <div id="label">
                                <span class="font_bold_m">Exporter/Shipper</span>
                                <div id="label_cont">
                                    <span class="font_min_normal">Contact:</span>&nbsp;&nbsp;&nbsp;<span class="font_normal">via FedEx IPD</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Co Name:</span>&nbsp;<span class="font_normal">FEDEX EXPRESS</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Address1:</span>&nbsp;<span class="font_normal">6100 NW 36 Street</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Address2:</span>&nbsp;<span class="font_normal">Building 831</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">City:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal">Miami</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">St/PV:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal">FL</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Phone:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal">1-866-638-2482</span>
                                </div>
                            </div>
                        </div>

                        <div style="margin: -148px 0px 10px 525px">
                            <div id="label_cont">
                                <span class="font_min_normal">Country/Territory:</span>&nbsp;<span class="font_normal">US</span>
                            </div>
                        </div>

                        <div style="margin: -148px 0px 100px 650px">
                            <div id="label_cont">
                                <span class="font_min_normal">Postal:</span>&nbsp;<span class="font_normal">33115</span>
                            </div>
                        </div>

                    </v-row>

                    <v-row>

                        <!--Broker-->
                        <div style="margin: -100px 30px">

                            <div id="label">
                                <span class="font_bold_m">Broker</span>
                                <div id="label_cont">
                                    <span class="font_min_normal">Contact:</span>&nbsp;&nbsp;&nbsp;<span class="font_normal"></span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Co Name:</span>&nbsp;<span class="font_normal"></span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Address1:</span>&nbsp;<span class="font_normal"></span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Address2:</span>&nbsp;<span class="font_normal"></span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">City:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal"></span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">St/PV:</span><span class="font_normal">-</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Phone:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal"></span>
                                </div>
                            </div>

                        </div>

                        <div style="margin: 10px 30px 100px 110px">
                            <div id="label_cont">
                                <span class="font_min_normal">Country/Territory:</span>&nbsp;<span class="font_normal"></span>
                            </div>
                        </div>

                        <div style="margin: 10px 30px 100px 35px">
                            <div id="label_cont">
                                <span class="font_min_normal">Postal:</span>&nbsp;<span class="font_normal"></span>
                            </div>
                        </div>

                        <!--Importer-->
                        <div style="margin: -103px 30px 100px 45px">

                            <div id="label">
                                <span class="font_bold_m">Importer</span>
                                <div id="label_cont">
                                    <span class="font_min_normal">Contact:</span>&nbsp;&nbsp;&nbsp;<span class="font_normal">VIA IPD SERVICE</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Co Name:</span>&nbsp;<span class="font_normal">FEDEX EXPRESS</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Address1:</span>&nbsp;<span class="font_normal">6100 NW 36 Street</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Address2:</span>&nbsp;<span class="font_normal">Building 831</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">City:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal">Miami</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">St/PV:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal">FL</span>
                                </div>
                                <div id="label_cont">
                                    <span class="font_min_normal">Phone:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font_normal">1-866-638-2482</span>
                                </div>
                            </div>
                        </div>

                        <div style="margin: -123px 0px 10px 525px">
                            <div id="label_cont">
                                <span class="font_min_normal">Country/Territory:</span>&nbsp;<span class="font_normal">US</span>
                            </div>
                        </div>

                        <div style="margin: -123px 0px 100px 650px">
                            <div id="label_cont">
                                <span class="font_min_normal">Postal:</span>&nbsp;<span class="font_normal">33115</span>
                            </div>
                        </div>

                    </v-row>

                    <div style="margin: -50px 20px 10px 30px ">

                        <v-simple-table class="table-items-billing">
                            <template v-slot:default>
                                <thead class="thead">
                                    <tr>
                                        <th>Marks & No.</th>
                                        <th>PartNumber</th>
                                        <th>HS Code/Description of Goods</th>
                                        <th>Origin of Mfg</th>
                                        <th>Unit of Measure</th>
                                        <th>Qty</th>
                                        <th>Unit Value</th>
                                        <th>Total Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="doc in $store.state.definitiveData" ref="">

                                        <tr v-for="(detail, index) in doc.group" :key="index">

                                            <td>-</td>
                                            <td>-</td>
                                            <td>{{ detail.description }}</td>
                                            <td>PY</td>
                                            <td>EA</td>
                                            <td>{{detail.quanty}}</td>
                                            <td>{{detail.unit_value}}</td>
                                            <td>{{detail.total_value}}</td>

                                        </tr>

                                        <tr>
                                            <td colspan="3">Subtotal {{doc.group[0].part_number}} COO: PY</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>{{ (doc.total_value/doc.group[0].unit_value)}}</td>
                                            <td>-</td>
                                            <td>{{doc.total_value}}</td>
                                        </tr>

                                    </template>
                                </tbody>
                                
                            </template>
                        </v-simple-table>
                        <!--            
             <table class="table table-bordered table-items-billing">
                <thead>
                    <tr>
                        <th >Marks & No.</th>
                        <th>PartNumber</th>
                        <th>HS Code/Description of Goods</th>
                        <th>Origin of Mfg</th>
                        <th>Unit of Measure</th>
                        <th>Qty</th>
                        <th>Unit Value</th>
                        <th>Total Value</th>
                    </tr>                
                </thead>
                <tbody>
                    <tr v-for="item in $store.state.definitiveData" :key="item.name">

                        <td v-for="detail in item.group" :key="detail.name">

                            <tr>{{detail.description}}</tr>

                        </td>

                        <td>ds</td>

                </tr>
                </tbody>
            </table>  -->

                    </div>

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

        {{ $store.state.definitiveData[1] }}

        <!--
        <v-list>

            <v-list-item-group>

                <v-list-item v-for="item in $store.state.definitiveData" :key="item.name">

                    <v-list-item-content>

                        <v-list-item-title>{{ item.group.description}}</v-list-item-title>

                    </v-list-item-content>

                </v-list-item>

            </v-list-item-group>

        </v-list>

        <v-col cols="12" sm="6" md="4" v-for="item in $store.state.definitiveData" :key="item.name">

            <v-list v-for="art in item.group" :key="art.name">

                <v-list-item-group>

                    <v-list-item>

                        <v-list-item-content>

                            <v-list-item-title>{{ art.description}}</v-list-item-title>
                            <v-list-item-subtitle>{{ art.part_number }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ art.quanty }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ art.unit_value }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ art.total_value }}</v-list-item-subtitle>

                        </v-list-item-content>

                    </v-list-item>

                </v-list-item-group>

            </v-list>

            <v-list v-for="into in item" :key="into.id">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{into.total_value}}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>

            </v-list>

        </v-col>  -->

    </v-row>

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
        items: [{

            }

        ]

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

    },

}
</script>

<style lang="scss">
// add style table
@import '~vuetify/src/styles/styles.sass';

#label {
    position: absolute;
}

#label_cont {
    position: relative;
    text-align: left;
}

.font_normal {
    font-size: 13px;
    font-weight: normal;
    font-family: 'Calibri';
}

.font_min_normal {
    font-size: 12px;
    font-weight: bold;
    font-family: 'Calibri';
}

.font_bold {
    font-size: 16px;
    font-weight: bold;
    font-family: 'Calibri';
}

.font_bold_m {
    font-weight: bold;
    font-family: 'Calibri';
    font-size: 13px;
    //subrayado
    text-decoration: underline;
}

.td_list {
    font-size: 13px;
    font-weight: normal;
    font-family: 'Calibri';
    background: #a09b9b;
}

/*   .on-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
}    */

// add style table-items-billing
.table-items-billing {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    border-radius: 0px;
    font-size: 10px;
    border-spacing: 0;
    border: 1px solid #1b1919;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

    .thead {
        text-align: left;
        font-size: 12px;
        padding: 8px;
        border-bottom: 1px solid #e0e0e0;

    }

    .tbody {
        tr {
            border-bottom: 1px solid #e0e0e0;

            td {
                padding: 8px;
                font-size: 10px;
                align-content: flex-start;
            }

            &:last-child {
                border-bottom: 0;
            }
        }

        td {
            padding: 8px;
            font-size: 10px;
            align-content: flex-start;
        }
    }
}
</style>
