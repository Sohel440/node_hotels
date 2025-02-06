// function add(a , b){
//     return a + b;
// }

// var res = add(6 , 3);
// // console.log(res);
// const a = (add)=>{    // call back function 
//     console.log(4*5);
//    const b = add(4,5);
//    console.log(b);
// }
// a(add);




/* Day - 2 */


// const object_ ={
//     name : "sohel",
//     age : 21
// }
// const json= JSON.stringify(object_);
// console.log( typeof json);


// const obj = JSON.parse(json);
// console.log(typeof obj);



/* express */



const express = require('express')
const app = express()
const db = require('./db'); 
const Person = require('./models/person')
const bodyParser = require('body-parser');
const Menu =require('./models/Menu');


app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World....welcome')
})

// app.get('/chicken' , function(req , res){
//     var obj ={
//         name : 'hen',
//         age:4,
//         location: 'Budge Budge'
//     }
//     console.log(obj)
//     res.send(obj)
// })







/*menu data access*/

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu' , menuRoutes);
/*person data access  */
const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

/*ensure the server is running*/

app.listen(3000 , ()=>{
  console.log('listening on port 3000');
  
})

