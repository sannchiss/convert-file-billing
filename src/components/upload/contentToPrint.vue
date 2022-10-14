<template>


  <div class="body">

    <v-row>

      <v-col>
        <div style="margin: 0px 150px">          
          <span class="font_bold">FedEx IPD Consolidated Commercial Invoice</span> 
        </div>

      </v-col>

    </v-row>

    <v-row>

       <div id="label">
        <span class="font_bold_m">Ship Date</span>
        
        <div id="label_cont">
          <span class="font_normal">Ship Date</span>
        </div> 

      </div>

      <div style="margin: 0px 150px">
        <div id="label">
           <span class="font_bold_m">Intl Air Waybill</span> 
          <div id="label_cont">
            <span class="font_normal">Intl Air Waybill</span>
          </div>
        </div>
        
      </div>

      <!-- <div style="margin: 0px 80px">
          <div style='text-align: center;'>
              <img alt='Barcode Generator TEC-IT'
                  src='https://barcode.tec-it.com/barcode.ashx?data=ACI-554699393983&code=Code39FullASCII'/>
          </div>
      </div> -->

    </v-row>

    <v-row>

      <div style="margin: 40px 0px">
        <div id="label">
           <span class="font_bold_m">Invoice Number</span> 
          <div id="label_cont">
            <span class="font_normal">1234567890</span>
          </div>
        </div>
        
      </div>

      <hr class="solid" style="margin: 80px 0px">

    </v-row>

   

  



    




   <!--  <v-row>

      <div class="border-rounded" style="margin: -15px 5px">
       

        <div class="d-inline-flex pa-2">
          <div class="style_header">FECHA / DATE:</div>
        </div>
        <div class="d-inline-flex pa-2">
          <div class="style_header">SEÑORES / MESSRS: {{subheader.messrs}}</div>
        </div>
        <div class="d-inline-flex pa-2">
          <div class="style_header">DIRECCIÓN / ADDRESS: {{subheader.address}}</div>
        </div>
        <div class="d-flex justify-space-between mb-6">
          <v-row>
            <v-col>

              <div class="style_header">CIUDAD / CITY: {{subheader.city}}</div>

            </v-col>
            <v-col>

              <div class="style_header">PAIS / COUNTRY: {{subheader.country}}</div>

            </v-col>

          </v-row>
        </div>
        <div class="d-flex justify-space-between mb-6">
          <v-row>
            <v-col>
          <div class="style_header">TELÉFONO / TELEPHONE: {{subheader.phone}}</div>
            </v-col>
            <v-col>
          <div class="style_header">FAX: {{subheader.fax}}</div>
            </v-col>
          </v-row>
        </div>
        <div class="d-inline-flex pa-2">
          <div class="style_header">CONDICIONES DE PAGO / PAYMENT TERMS: {{subheader.payment}}</div>
        </div>




      
      </div>


    </v-row> -->

<!--     <v-row>

      <div class="footer">
dffdfdf
      </div>

    </v-row> -->




  </div>
</template>
<script>
export default {

  data:() => ({

    subheader: {
      date: Date.now(),
      messrs: 'ZEN DISTRIBUIDORS GROUP LLC',
      address: '2047 NW 79TH AVE, MIAMI, FL 33122, USA',
      city: 'MIAMI',
      phone: '+ 1-866-638-2482',
      payment: 'CREDITO',
      country: 'ESTADOS UNIDOS',
      fax: '1-866-638-2482'
      

    }

  })




}

</script>

<style lang="scss" scoped>

.body {
  font-family: 'Calibri';
  font-size: 12px;
  margin: 30px 30px;
}

hr.solid {
  border-top: 1px solid #bbb;
  width: 100%;
}

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
  font-family:'Calibri';
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


// div border rounded
.border-rounded {
  border-radius: 10px;
  width: 850px;
  height: 140px;
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
}


// add footer
.footer {
  position: relative;
  margin: -15px 15px;
  left: 0;
  bottom: -800px;
  width: 100%;
  background-color: #f5f5f5;
  color: black;
  text-align: center;
  padding: 10px;
  border-top: 1px solid black;
}
</style>
