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
    headObj: {},
    dataFile: [],
    groupPartNumber: [],
    definitiveData: [],
    totalCommodityValue: [],

  },
  getters: {
  },
  mutations: {

    async setFile(state, file) {
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

  
          state.headObj = {
            num_timbre: headFile[0][1],
            date_valid_until: headFile[0][3],
            date_initial_validity: headFile[0][6],
            num_doc: headFile[0][13],
          } 

          /********************************************** */


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
                description: data[0][10].replace(/[^a-zA-Z0-9 ]/g, ""),
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
              unit_value: parseInt(item.total_value) / item.quanty,
              total_value: parseInt(item.total_value),
            }
          })




         // console.log("El resultado es dataFile: ",dataFile)

          /*********************************************************** */
          /**
           * 
           * GRUOP BY part_number and sum total_value
           * 
           */
          /*********************************************************** */
          
          state.groupPartNumber = dataFile.reduce((r, a) => {
            r[a.part_number] = [...r[a.part_number] || [], a];

            // sum total_value
               r[a.part_number].total_value = r[a.part_number].reduce((a, b) => {
              return parseInt(a) + parseInt(b.total_value)
            }, 0)   


           /*  state.definitiveData.push(r[a.part_number].total_value = r[a.part_number].reduce((a, b) => {
              return parseInt(a) + parseInt(b.total_value)
            }, 0)) */


            return r;
          }, {});

       /*    db.collection('groupPartNumber').add(
            state.groupPartNumber
          ) */

          try {
           /*  let groupPartNumber =  db.collection('groupPartNumber')
            groupPartNumber.get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log("El resultado es: ",doc.data())
              })
            }) */
    

            /* db.collection('groupPartNumber').get().then(groupPartNumber => {
              console.log(groupPartNumber[0])
            })
        */
            
    
          }
          catch (error) {
            console.log('error: ', error)
          }


         console.log("El resultado es groupPartNumber: ",state.groupPartNumber)

          /*********************************************************** */
          // get sum total_value groupFormat
          const sumTotalValue = Object.values(state.groupPartNumber).map((item) => {
            return item.reduce((a, b) => {
              return {
                id: a.id,
                description: a.description,
                part_number: a.part_number,
                quanty: a.quanty,
                unit_value: a.unit_value,
                total_value: parseInt(a.total_value) + parseInt(b.total_value),
              }
            })
          })


          // sum total_value in sumTotalValue
          state.totalCommodityValue = sumTotalValue.reduce((a, b) => {
            return {
              quanty: a.quanty,
              unit_value: a.unit_value,
              total_value: parseInt(a.total_value) + parseInt(b.total_value),
            }
          })

         console.log("El resultado es totalCommodityValue: ",state.totalCommodityValue)

         // console.log("El resultado es groupPartNumber: ", state.groupPartNumber)
          
          // recorrer el objeto groupPartNumber
          for (const [key, value_1] of Object.entries(state.groupPartNumber)) {
            //console.log(`${key}: ${value_1.total_value}`);

            /* console.log("El resultado es value_1: ", value_1)
      
            console.log("El resultado es value_1: ", value_1.total_value) */


            state.definitiveData.push({
              group: value_1,
              total_value: value_1.total_value
            })




           // for in value
            for (const [key, value] of Object.entries(value_1)) {
              //console.log(`${key}: ${value}`);

              //console.log("El resultado es value: ", value)

                   // console.log("El resultado es value: ", value[1])
           
            }

          }


          //console.log("El resultado es sumTotalValue: ", state.definitiveData) 



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
