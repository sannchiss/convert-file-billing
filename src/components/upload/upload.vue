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

                <v-form ref="formReport">

                <v-card-title>
                    {{ title }}
                </v-card-title>

                <v-card-text>

                    <v-row>

                        <v-col cols="5">

                            <v-file-input 
                            v-model="$store.state.file" 
                            prepend-icon="mdi-paperclip"
                            :rules="fileRules"
                            accept="txt/*" 
                            label="File .txt" 
                            show-size @change="onFileChange"
                            >
                            </v-file-input>

                        </v-col>

                    </v-row>

                    <v-row>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                <!--add file date-->

                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        label="Ship Date"
                                        :rules="dateRules"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="date"
                                    no-title
                                    scrollable
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(date)"
                                    >
                                        OK
                                    </v-btn>
                                    </v-date-picker>
                                </v-menu>


                                </v-col>

                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    label="Invoice Number"
                                    v-model="invoiceNumber"
                                    :rules="invoiceNumberRules"
                                    ></v-text-field>
                                </v-col>

                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    label="Intl Air Waybill"
                                    v-model="intlAirWaybill"
                                    :maxlength="12"
                                    :rules="intlAirWaybillRules"
                                    ></v-text-field>
                                </v-col>
                                                              
                               
                                </v-row>

                                <v-row>
                                    
                                    <v-col cols="5" sm="2">
                                        <v-text-field
                                        label="Total Weight (KGS)"
                                        v-model="totalWeight"
                                        :rules="totalWeightRules"
                                        required
                                        ></v-text-field>
                                    </v-col>      
                                    <v-col cols="5" sm="2">
                                        <v-text-field
                                        label="Total Packages"
                                        v-model="totalPackages"
                                        :rules="totalPackagesRules"
                                        required
                                        ></v-text-field>
                                    </v-col>                           

                                </v-row>

                            </v-container>
                            <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>                           
                            <v-btn 
                            :loading="$store.state.loading" 
                            color="blue-grey" 
                            class="ma-2 white--text" 
                            v-on:click.prevent="generateReport">
                                Generate PDF
                                <v-icon right dark>
                                    mdi-file-pdf-box
                                </v-icon>
                            </v-btn>
                            </v-card-actions>

                    </v-row>

                </v-card-text>

                <v-card-text>

                </v-card-text>

                </v-form>

            </v-card>

        </v-col>


    </v-row>

</v-container>
</template>

<script>


import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export default {

    data: () => ({
        title: 'Upload File',
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        date: '',
        intlAirWaybill: '',
        invoiceNumber: '',
        totalWeight: '',
        totalPackages: '',

        fileRules: [
            v => !!v || 'File is required',
        ],

        dateRules: [
            v => !!v || 'Date is required',
        ],

        intlAirWaybillRules: [
            v => !!v || 'Intl Air Waybill is required',
            //limit to 11 characters
            v => v.length <= 12 || 'Intl Air Waybill must be less than 12 characters',
        ],

        invoiceNumberRules: [
            v => !!v || 'Invoice Number is required',
        ],

        totalWeightRules: [
            v => !!v || 'Total Weight is required',
        ],
        totalPackagesRules: [
            v => !!v || 'Total Packages is required',
        ],

    }),
    methods: {
       
        onFileChange(file) {
            this.$store.commit('setFile', file)
        },

        generateReport() {

            // get  value v-date-picker
            var date = this.date;
            // get value v-text-field
            var intlAirWaybill = this.intlAirWaybill;
            var invoiceNumber = this.invoiceNumber;
            var totalWeight = this.totalWeight;
            var totalPackages = this.totalPackages;



        if(this.$refs.formReport.validate()){
                

                // get date formnate yyyy-mm-dd
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;
            

                
                const doc = new jsPDF({

                    unit: 'mm',
                    format: 'a4',

                });
             

                doc.setFontSize(10);
                doc.setFont("helvetica", "bold");
                doc.text("FedEx IPD Consolidated Commercial Invoice", 45,15 );


                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Ship Date", 10,22 );
                doc.setFont("helvetica", "normal");
                doc.text(date, 10,27 );

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Intl Air Waybill", 40,22 );
                doc.setFont("helvetica", "normal");
                doc.text(intlAirWaybill, 40,27 );
                doc.addImage("https://www.webarcode.com/barcode/image.php?code=ACI-"+ intlAirWaybill +"&type=C128B&xres=1&height=100&width=258&font=2&output=png&style=196", "JPEG", 100, 18, 85, 24);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Invoice Number", 10,35 );
                doc.setFont("helvetica", "normal");
                doc.text(invoiceNumber, 10,40 );


                // add line break
                doc.line(10, 45, 200, 45);


                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Bill Trans. Charges", 10,52);
                doc.setFont("helvetica", "normal");
                doc.text("432237605", 10,58 );


                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Bill D/T/F", 50,52);
                doc.setFont("helvetica", "normal");
                doc.text("432237605", 50,58 );


                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Currency", 90,52);
                doc.setFont("helvetica", "normal");
                doc.text("USD", 90,58 );

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Customer References", 130,52);
                doc.setFont("helvetica", "normal");
                doc.text("", 130,58 );

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Terms of Sale", 10,65);
                doc.setFont("helvetica", "normal");
                doc.text("FCA", 10, 70);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Total Wgt", 50,65);
                doc.setFont("helvetica", "normal");
                doc.text(totalWeight, 50, 70);


                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Wgt Type", 90,65);
                doc.setFont("helvetica", "normal");
                doc.text("KGS", 90, 70);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Total Packages", 130,65);
                doc.setFont("helvetica", "normal");
                doc.text(totalPackages, 130, 70);


                /**************************** */

                doc.setFontSize(9);
                doc.setFont("helvetica", "bold");       
                doc.text("EXPORTER/SHIPPER", 10,77);
                doc.setFont("helvetica", "italic");
            
                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Contact:   Luis Kellemen", 10, 82);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Co Name: KALOS S.A", 10, 87);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Address1: Bernardino Caballero S/N", 10, 92);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Address2: Mariano Roque Alonso", 10, 97);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("City:           Asunción", 10, 102);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("St/PV: -                        Country/Territory: PY        Postal:-", 10, 107);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Phone:      595 217 51596            Tax ID: 80078648-3", 10, 112);

                /**************************** */

                doc.setFontSize(9);
                doc.setFont("helvetica", "bold");       
                doc.text("BROKER", 10,119);
                doc.setFont("helvetica", "italic");

                
                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Contact:   -", 10, 124);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Co Name: -", 10, 129);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Address1: -", 10, 134);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Address2: -", 10, 139);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("City: -", 10, 144);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("St/PV: -                        Country/Territory: -        Postal:-", 10, 149);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Phone:      ", 10, 154);

        
                /***
                 * SEGUNDA COLUMNA
                 ********** */
                
                doc.setFontSize(9);
                doc.setFont("helvetica", "bold");       
                doc.text("SHIP TO (CONSIGNEE)", 110,77);
                doc.setFont("helvetica", "italic");
            
                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Contact:   via FedEx IPD", 110, 82);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Co Name: FEDEX EXPRESS", 110, 87);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Address1: 6100 NW 36 Street", 110, 92);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Address2: Building 831", 110, 97);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("City:          Miami", 110, 102);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("St/PV:        FL                Country/Territory: US        Postal:33115", 110, 107);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Phone:      7862656564", 110, 112);

                /******************* */

                doc.setFontSize(9);
                doc.setFont("helvetica", "bold");       
                doc.text("IMPORTER", 110,119);
                doc.setFont("helvetica", "italic");

                
                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Contact:   Luis Kellemen", 110, 124);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Co Name: ZEN DICTRIBUTORS GROUP II LLC", 110, 129);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Address1: 2047 NW 24TH Ave", 110, 134);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Address2: -", 110, 139);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("City:           Miami", 110, 144);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("St/PV:         FL                Country/Territory: US        Postal:33142", 110, 149);

                doc.setFontSize(8);
                doc.setFont("helvetica", "bold");
                doc.text("Phone:       305 905 8105      Tax ID: 26-04-20325", 110, 154);



                function thousands_separators(num)
                {
                    var num_parts = num.toString().split(".");
                    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    return num_parts.join(",");
                }




                let info = [] 

                this.$store.state.definitiveData.forEach((element_1, index, array) => {

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
                            thousands_separators(element_2.total_value),
                            ]
                            )

                    })


                    info.push(
                            [
                            'Subtotal',
                            element_1.group[0].part_number,
                            '',
                            '',
                            '',
                            element_1.total_value / element_1.group[0].unit_value,
                            '-',
                            thousands_separators(element_1.total_value),
                            


                            ,
                            
                            ]
                            )

                })



                autoTable(doc, { 
                    head: [
                    ['Marks & No', 
                    'Part Number', 
                    'HS Code/Description of Goods ', 
                    'Origin of Mfg', 
                    'Unit of Measure', 
                    'Qty', 'Unit Value', 
                    'Total Value'
                    ]],
                    styles: {
                        fontSize: 8,
                        cellPadding: 0.5,
                        overflow: 'linebreak',
                        columnWidth: 'wrap',
                        halign: 'center',
                        valign: 'middle',
                        cellWidth: 'auto',
                        minCellHeight: 10,
                        rowPageBreak: 'avoid',
                        
                    },
                    headStyles: { 
                        // textcolor black
                        textColor: [0, 0, 0],
                        fontStyle: 'bold',
                        fontSize: 8,
                        halign: 'center',
                        valign: 'middle',
                        // add borders externally
                        lineWidth: 0.1,
                        lineColor: [0, 0, 0],

                    },           
                    startY: 165, 
                    tableWidth: 'auto',
                    theme: 'plain',
                    body:          
                    info,
                    bodyStyles: {
                        minCellHeight: 10,
                        valign: 'middle',
                        halign: 'center',
                        fontSize: 8,
                        cellPadding: 0.5, 
                    },

                
                

                    didParseCell: function (data) {
                
                    // change color of row content word "Subtotal" y column de al lado

                    let index 
                        if (data.cell.raw == 'Subtotal' ) {

                                data.cell.styles.fillColor = [229,229,229];
                                data.cell.styles.textColor = [0, 0, 0];
                                data.cell.styles.fontStyle = 'bold';
                                data.cell.styles.fontSize = 8;
                                data.cell.styles.halign = 'center';
                                data.cell.styles.valign = 'middle';
                            

                                // capture index of row when find "Subtotal"
                                index = data.row.index
                            
                        }  

                        if ( data.row.index == index  ) {

                        let col = data.column.dataKey


                            // change color of row content word "Subtotal" y column de al lado
                            data.row.cells[col + 1].styles.fillColor = [229,229,229];
                            data.row.cells[col + 1].styles.textColor = [0, 0, 0];
                            data.row.cells[col + 1].styles.fontStyle = 'bold';
                            data.row.cells[col + 1].styles.fontSize = 8;
                            data.row.cells[col + 1].styles.halign = 'center';
                            data.row.cells[col + 1].styles.valign = 'middle'; 

                            // change color of row content word "Subtotal" y column de al lado
                            data.row.cells[col + 2].styles.fillColor = [229,229,229];
                            data.row.cells[col + 2].styles.textColor = [0, 0, 0];
                            data.row.cells[col + 2].styles.fontStyle = 'bold';
                            data.row.cells[col + 2].styles.fontSize = 8;
                            data.row.cells[col + 2].styles.halign = 'center';
                            data.row.cells[col + 2].styles.valign = 'middle';

                            // change color of row content word "Subtotal" y column de al lado
                            data.row.cells[col + 3].styles.fillColor = [229,229,229];
                            data.row.cells[col + 3].styles.textColor = [0, 0, 0];
                            data.row.cells[col + 3].styles.fontStyle = 'bold';
                            data.row.cells[col + 3].styles.fontSize = 8;
                            data.row.cells[col + 3].styles.halign = 'center';
                            data.row.cells[col + 3].styles.valign = 'middle';

                            // change color of row content word "Subtotal" y column de al lado
                            data.row.cells[col + 4].styles.fillColor = [229,229,229];
                            data.row.cells[col + 4].styles.textColor = [0, 0, 0];
                            data.row.cells[col + 4].styles.fontStyle = 'bold';
                            data.row.cells[col + 4].styles.fontSize = 8;
                            data.row.cells[col + 4].styles.halign = 'center';
                            data.row.cells[col + 4].styles.valign = 'middle';


                            // change color of row content word "Subtotal" y column de al lado
                            data.row.cells[col + 5].styles.fillColor = [229,229,229];
                            data.row.cells[col + 5].styles.textColor = [0, 0, 0];
                            data.row.cells[col + 5].styles.fontStyle = 'bold';
                            data.row.cells[col + 5].styles.fontSize = 8;
                            data.row.cells[col + 5].styles.halign = 'center';
                            data.row.cells[col + 5].styles.valign = 'middle';

                            // change color of row content word "Subtotal" y column de al lado
                            data.row.cells[col + 6].styles.fillColor = [229,229,229];
                            data.row.cells[col + 6].styles.textColor = [0, 0, 0];
                            data.row.cells[col + 6].styles.fontStyle = 'bold';
                            data.row.cells[col + 6].styles.fontSize = 8;
                            data.row.cells[col + 6].styles.halign = 'center';
                            data.row.cells[col + 6].styles.valign = 'middle';

                            // change color of row content word "Subtotal" y column de al lado
                            data.row.cells[col + 7].styles.fillColor = [229,229,229];
                            data.row.cells[col + 7].styles.textColor = [0, 0, 0];
                            data.row.cells[col + 7].styles.fontStyle = 'bold';
                            data.row.cells[col + 7].styles.fontSize = 8;
                            data.row.cells[col + 7].styles.halign = 'center';
                            data.row.cells[col + 7].styles.valign = 'middle';

                                // change color of row content word "Subtotal" y column de al lado
                            data.row.cells[col + 7].styles.fillColor = [229,229,229];
                            data.row.cells[col + 7].styles.textColor = [0, 0, 0];
                            data.row.cells[col + 7].styles.fontStyle = 'bold';
                            data.row.cells[col + 7].styles.fontSize = 8;
                            data.row.cells[col + 7].styles.halign = 'center';
                            data.row.cells[col + 7].styles.valign = 'middle';

                    }
                        


                    },
                    
                
                })


                let footer = [         
                    [
                    '',
                    '',              
                    'Total Shipment Wgt:',         
                    totalWeight+' Kg',
                    ],
                    [
                    '',
                    '',              
                    'Total Commodity Value:',         
                    thousands_separators(this.$store.state.totalCommodityValue.total_value),
                    ],                   
                    [
                    'Comments:',
                    '',              
                    'Freight:',         
                    '.00 kg',     
                    ],
                    [
                    '',
                    '',              
                    'Insurance:',         
                    '.00 kg',
                    ],
                    [
                    '',
                    '',              
                    'Other:',         
                    '.00 kg',
                    ],            
                    [
                    '',
                    '',              
                    'Tax Amount:',         
                    '.00 kg',
                    ],            
                    [
                    '',
                    '',              
                    'Total Invoice Value:',         
                    thousands_separators(this.$store.state.totalCommodityValue.total_value),
                    ],
                    [
                    'I DECLARE ALL INFORMATION CONTAINED IN THIS REPORT TO BE TRUE AND CORRECT',
                    '',              
                    '',         
                    '',
                    ],
                    [
                    '',
                    '',         
                    '',
                    '',
                    ]

                ]



                
                // add footer final table
                autoTable(doc, {
                    head: [['','','','']],
                    body: footer,
                    startY: doc.autoTable.previous.finalY + 1,
                    theme: 'plain',
                    styles: { 
                        textColor: [0,0,0],
                        fontSize: 8,
                        fontStyle: 'bold',
                        halign: 'left',
                        valign: 'middle',
                        overflow: 'linebreak',
                        columnWidth: 'wrap',
                        cellWidth: 'auto',
                        minCellHeight: 10,
                        rowPageBreak: 'avoid',
                        // change hight of row
                        cellHeight: 10,
                        fontSize: 8,
                        cellPadding: 0.1,

                    },

                })

                let piePag = [
                    [
                    '_______________________________________________________________________________________________________________',
                    
                    ],
                    [
                    'Signature of Shipper/Exporter (Name and Title)                     Date:'+ today
                        ,
                    ],
                    [
                        ''
                    ],
                    [
                    'CUSTOMER SERVICE',
                    ],
                    [
                    '_______________________________________________________________________________________________________________',
                    ],
                    [
                        'Name (Printed) of Shipper/Exporter (Name and Title)'

                    ]

            ]

                


                autoTable(doc, {
                    head: [['']],
                    body: piePag,
                    startY: doc.autoTable.previous.finalY + 2,
                    cellWidth: 'auto',
                    theme: 'plain',
                    styles: { 
                        textColor: [0,0,0],
                        fontSize: 8,
                        halign: 'left',
                        valign: 'middle',
                        overflow: 'linebreak',
                        columnWidth: 'wrap',
                        cellWidth: 'auto',
                        // aumentar altura


                    

                    },

                }

                

                )

                //doc.save('table.pdf')

                // count number of pages

                var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
                for(var i = 0; i < pageCount; i++) {
                doc.setPage(i);
                let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
                doc.setFontSize(9);
                doc.text('page: ' + pageCurrent + '/' + pageCount, 10, 10);
                }





                // view in browser
                doc.output("dataurlnewwindow");




            }

            else{

   
                

            }

        }



  

    },
    components: {
        contentToPrint: require('@/components/upload/contentToPrint.vue').default,

    },

}
</script>

<style lang="scss">
// add style table
#output {
        width: 100%;
        height: 100vh;
        margin-top: 20px;
      }

      #my-table {
        border: solid 1px #565656;
        border-collapse: collapse;
        font-family: helvetica,serif;
        font-size: 10pt;
        width: 180mm;
      }

      #my-table th {
        border: solid 1px #565656;
        background-color: #9a7f5b;
        color: #eee;
        text-align: left;
        padding: 5px;
      }

      #my-table td {
        border: solid 1px #565656;
        padding: 2px 5px;
      }
</style>
