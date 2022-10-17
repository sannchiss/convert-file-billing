<template>
<v-container>

    <v-row>


        <v-col md="12" pt-15>

            <table id="my-table"><!-- ... --></table>

        </v-col>



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

import VueHtml2pdf from 'vue-html2pdf'

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export default {

    data: () => ({
        title: 'Upload File',
        i: 0,

        array: [
            { id: 1, name: 'John', age: 30, city: 'New York' },
            { id: 2, name: 'Marry', age: 28, city: 'London' },
            { id: 3, name: 'Peter', age: 32, city: 'Paris' },
            { id: 4, name: 'John', age: 30, city: 'New York' },
            { id: 5, name: 'Marry', age: 28, city: 'London' },
            { id: 6, name: 'Peter', age: 32, city: 'Paris' },
            { id: 7, name: 'John', age: 30, city: 'New York' },
            { id: 8, name: 'Marry', age: 28, city: 'London' },
            { id: 9, name: 'Peter', age: 32, city: 'Paris' },
            { id: 10, name: 'John', age: 30, city: 'New York' },
            { id: 11, name: 'Marry', age: 28, city: 'London' },
            { id: 12, name: 'Peter', age: 32, city: 'Paris' },
            { id: 13, name: 'John', age: 30, city: 'New York' },
            { id: 14, name: 'Marry', age: 28, city: 'London' },
            { id: 15, name: 'Peter', age: 32, city: 'Paris' },
            { id: 16, name: 'John', age: 30, city: 'New York' },
            { id: 17, name: 'Marry', age: 28, city: 'London' },
            { id: 18, name: 'Peter', age: 32, city: 'Paris' },
            { id: 19, name: 'John', age: 30, city: 'New York' },
            { id: 20, name: 'Marry', age: 28, city: 'London' },
            { id: 21, name: 'Peter', age: 32, city: 'Paris' },
            
            
            
        ],

        

    }),
    methods: {

        testing() {
            // call router
            this.$router.push({ name: 'test' })
        },
        onFileChange(file) {
            this.$store.commit('setFile', file)
        },

        generateReport() {
         //  this.$refs.html2Pdf.generatePdf()

        // Landscape export, 2×4 inches
        const doc = new jsPDF({

            pageFormat: 'a3',

         });

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("FedEx IPD Consolidated Commercial Invoice", 45,15 );


        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text("Ship Date", 10,22 );
        doc.setFont("helvetica", "normal");
        doc.text("2022-10-17", 10,27 );

        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text("Intl Air Waybill", 40,22 );
        doc.setFont("helvetica", "normal");
        doc.text("554699393983", 40,27 );




   /*      let info = []

        this.array.forEach((element, index, array) => {
            console.log(element, index, array);
        
            info.push([element.name, element.age, element.city])

        }) */

        // loop $store.state.definitiveData

        let info = []

        let count  = 1

        this.$store.state.definitiveData.forEach((element_1, index, array) => {
            console.log("array 1",element_1.group);



            element_1.group.forEach((element_2, index , array) => {

                    info.push(
                    [
                      '',
                      '',
                      element_2.description,
                      'PY',
                      'EA', 
                      element_2.quanty,
                      element_2.unit_value,
                      element_2.total_value,
                    ]
                    )

            })


            info.push(
                    [
                      'Subtotal',
                      element_1.group[0].part_number,
                      '-',
                      '-',
                      '-',
                      element_1.total_value / element_1.group[0].unit_value,
                      '-',
                      parseFloat(element_1.total_value).toFixed(2),
                    ,
                      
                    ]
                    )

                

        

        })







        // change position of autoTable
        autoTable(doc, { 
            html: '#my-table', 
            startY: 140, 
            theme: 'plain', 
            tableWidth: 'auto',
             styles: { 
                fontSize: 4, 
                cellPadding: 0.5, 
                overflow: 'linebreak', 
                columnWidth: 'wrap' 
            }, 
        
        });




        autoTable(doc, {
        head: [['Marks & No', 'Part Number', 'HS Code/Description of Goods ', 'Origin of Mfg', 'Unit of Measure', 'Qty', 'Unit Value', 'Total Value']],
        body: info 
       /*   this.array.forEach(element => {
            [
                [element.name, element.name, element.name, element.name, element.name, element.name, element.name]
            ]
        
            
        })  */
        /* [
            ['David', 'david@example.com', 'Sweden'],
            ['Castille', 'castille@example.com', 'Spain'],  ['David', 'david@example.com', 'Sweden'],
            ['Castille', 'castille@example.com', 'Spain'],  ['David', 'david@example.com', 'Sweden'],
           

        ] */
        })

        

      






        // view in browser
        doc.output("dataurlnewwindow");
        

        
      

          

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

        hasPaginated(pdf) {
            // add page number in footer
        },

        beginPrint() {



            

        },

        async beforeDownload ({ html2pdf, options, pdfContent }) {
           /*  await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages()
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i)
                    pdf.setFontSize(10)
                    pdf.setTextColor(150)
                    pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
                } 
            }).save() */
        }

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
