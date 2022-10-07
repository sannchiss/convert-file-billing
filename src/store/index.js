import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    file: null,

    loading: false,

    headFile: [],
    dataFile: [],

  },
  getters: {
  },
  mutations: {

    setFile(state, file) {
      state.file = file
      state.loading = false


      if (state.file) {
      
        const reader = new FileReader()
        reader.readAsText(state.file, "UTF-8")
        reader.onload = (evt) => {

          // separate the file into lines
          const lines = evt.target.result.split(/\r\n|\n/)
          // get the first line
          const head = lines[0].split(',')

          // separate array contain \t
          const headFile = head.map((item) => {
            return item.split('\t')
          })

         /**
          * LINEA DE CABECERA ARCHIVO PLANO
          * 
          */ 

          const headObj = {
            num_timbre: headFile[0][1],
            date_valid_until: headFile[0][3],
            num_doc: headFile[0][13],
          } 

          /********************************************** */


           /* const headObj = headFile.map((item) => {
            return {
              num_timbre: item[1],
              date_valid_until: item[3],
              date_start_until: item[6],
              num_doc: item[13],
            }
          }) */ 



          for (var i = 1; i < lines.length; i++) {
            var line = lines[i]
            var parts = line.split(';')
            if (line.length > 0) {

              const data = parts.map((item) => {
                // separate array contain space
                return item.split('\t'||' ' )
              })

             // console.log("El archivo es: ",data)


              var obj = {
                id: i,
                description: data[0][10],
                part_number: data[0][10].match(/\d+/g).map(Number),
                
                quanty: parseInt(data[0][12]),
                unit_value: data[0][13],
                total_value: (data[0][14]).replace(/\./g, '').replace(/,/g, '.')

              }

              state.dataFile.push(obj)
             
            }
          }

           
          /**
           * AGRUPACION DE ELEMENTOS DUPLICADOS EN EL ARRAY dataFile y almacenados en el array group
           */
          // group in array duplicate part_number and sum quanty
          const group = state.dataFile.reduce((r, a) => {
            r[a.description] = [...r[a.description] || [], a];

            return r;
          }, {});

          /*********************************************************** */
         

          /**
           * SUMA DE LOS ELEMENTOS DUPLICADOS EN EL ARRAY group y almacenado en el array sum
           * 
           */

          const sum = Object.values(group).map((item) => {
            return item.reduce((a, b) => {
              return {
                id: a.id,
                description: a.description, 
                part_number: a.part_number,
                quanty: parseInt(a.quanty) + parseInt(b.quanty),
                unit_value: parseInt(a.unit_value) + parseInt(b.unit_value),
                total_value: parseInt(a.total_value) + parseInt(b.total_value),
              }
            })
          })


          /**
           * SUMA DE VALORES TOTALES DE LOS ELEMENTOS DUPLICADOS EN EL ARRAY sum y almacenado en el array total
           * CANTIDAD DE PIEZAS
           * VALOR TOTAL
           * PRECIO UNITARIO
           */
           const total = sum.reduce((a, b) => {

            return {
              quanty: parseInt(a.quanty) + parseInt(b.quanty),
              unit_value: parseInt(a.unit_value) + parseInt(b.unit_value),
              total_value: parseInt(a.total_value) + parseInt(b.total_value),
            }
          } )

          /******************************************************************* */

          // add array sum to object
          const dataFile = sum.map((item) => {
            return { 
              id: item.id,
              description: item.description,
              part_number: item.part_number,
              quanty: item.quanty,
              unit_value: item.unit_value,
              total_value: item.total_value,
            }
          })


          console.log("la cabecera es: ",headObj)


          console.log("El resultado es: ",dataFile)


          console.log("El total es: ",total)

         /*  const data = {
            headFile: headFile,
            dataFile: sum
          }

          console.log("El archivo data es: ",data) */
         


          // 
 

         

          



          


        }
        reader.onerror = (evt) => {
          alert("error reading file")
        }



   
      
      }



    }







  },
  actions: {


    setFile({ commit }, file) {
      commit('setFile', file)
    }






  },
  modules: {
  }
})
