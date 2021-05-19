
var cards;
var pri = 0;
var span_2 ;
var selectSpan = 0;
var getId = []
var makeDivSpanText = 1;
// var check2 = []
var getImage;
var divText1;
var span1;
var span2;
var selectSpanText;
var submitTotal = 0; 
var cartNum;
var cartNumPlus = 0;
var cartNumMinus;

// let get_data = () => {
firebase.database().ref('total').on('child_added', function(data){
    
    selectSpan.innerHTML = ""
    selectSpan = document.getElementById("last")
    selectSpanText = document.createTextNode(data.val().pri)
    // console.log(selectSpanText)
     selectSpan.appendChild(selectSpanText)
     submitTotal = document.getElementById("time") 
     submitTotal.innerHTML = data.val().pri + "/-"
    
     
})
// }

firebase.database().ref('cart').on('child_added', function(data){
    console.log(data.val())
    // get_data()
    var cart = document.getElementById("main-div")
    var maindiv = document.createElement("div")
    maindiv.className += " main_div"
    cart.appendChild(maindiv)

    var img = document.createElement("img")
    img.className += " cart-image"
    
    img.setAttribute("src", data.val().img)
    maindiv.appendChild(img)

    var textDiv = document.createElement("div")
    textDiv.className += " cart-text"
    maindiv.appendChild(textDiv)

    var div1 = document.createElement("div")
    var div1Text = document.createElement("h4")
    div1.appendChild(div1Text)
    
    var divText2 = document.createTextNode(data.val().heading)
    div1Text.appendChild(divText2)
    div1.className += " cart-div1"
    divText2.className += " text-1"
    textDiv.appendChild(div1)

    var div2 = document.createElement("div")
    div2.className += " cart-div2"

    
    var span_1 = document.createElement("span")
    span_1.className += " span-text"
    span_1.innerHTML = data.val().Rs
    div2.appendChild(span_1)
    
    
    // check2.push(cards.childNodes[3].childNodes[3].childNodes[2].innerHTML)
    span_2 = document.createElement("span")
    span_2.className += " span-text1"
    span_2.innerHTML = data.val().price
    div2.appendChild(span_2)
    textDiv.appendChild(div2)

    var makeDiv = document.createElement("div")
    var makeDivText = document.createTextNode("Qty x")
    makeDiv.className += " quantity"
    makeDiv.appendChild(makeDivText)
    textDiv.appendChild(makeDiv)

    var makeDivSpan = document.createElement("span")
        // makeDivSpanText = 0;
        makeDivSpan.className += " quantity-text"
        var text = document.createTextNode(data.val().qty)
        makeDivSpan.appendChild(text)
        makeDiv.appendChild(makeDivSpan)

    var delBtn = document.createElement("button")
    delBtn.className += " del-btn"
    delText = document.createTextNode("-")
    delBtn.appendChild(delText)
    textDiv.appendChild(delBtn)
    delBtn.setAttribute("onclick", "delItem(this)")
    delBtn.setAttribute("id", data.val().key)

    cartNum = document.getElementById("smallDiv")
    cartNumPlus++
    cartNum.innerHTML = cartNumPlus
 
    cartNumMinus = cartNumPlus
//    console.log(cartNumMinus)
   
})


function changeColor(id) {
    selectSpan.innerHTML = " ";
    cards = document.getElementById(id)
    cards.style.backgroundColor = "rgb(166, 168, 170)"
    getId.push(cards.getAttribute("id"))
   
    for (var i = 0; i < change.length; i++) {
        change[i].style.backgroundColor = "rgb(29, 53, 95)";
    }
    // haso()
  
     getImage = cards.childNodes[1].getAttribute("src")
     divText1 = cards.childNodes[3].childNodes[1].innerHTML
     span1 = cards.childNodes[3].childNodes[3].childNodes[0].innerHTML
     span2 = cards.childNodes[3].childNodes[3].childNodes[2].innerHTML
     
    
     sum() 
    
    
   
    var key = firebase.database().ref('cart').push().key
    var obj = {
        key: key,
        img: getImage,
        heading: divText1,
        Rs: span1,
        price: span2,
        qty: makeDivSpanText
    }
    var total = {
        pri: pri
    }

    firebase.database().ref('cart').child(key).set(obj) 
    firebase.database().ref('total').child(key).set(total)  
    
} 



                             // increment to the quantity
function haso(){
    for(var i = 0; i < getId.length; i++){
          if(cards.getAttribute("id") == getId[i]){
              makeDivSpanText++
              console.log(makeDivSpanText)
              
          }else{
              makeDivSpanText = 0;
          }
          return
    }
  
    }
// var check = [];

function sum(){
    // check.push(Number(span_2.innerHTML))
    pri += Number(span2)
    // console.log(span2)
    // pri += data.val().pri + span2
        
}


// function minus(){
//     for(var i = 0; i < check.length; i++){
//         for(var a = 0; a < check2.length; a++){
//             if(check[i] == check2[a]){
//                 console.log(check[a].parentNode)
//             }
//         }
//     }return
// }

var change = document.getElementsByClassName("btn")
for (var i = 0; i < change.length; i++) {
    change[i].innerHTML = "Add To Cart"
}

var submit = document.getElementById("submit")
submit.innerHTML = "Submit";

for (var i = 0; i < change.length; i++) {
    change[i].href = "javascript: void(0)"
}

var some;
function delItem(e) {
    
    some = e.parentNode.parentNode.childNodes[0].getAttribute("src")
    cartNumMinus--
    cartNum.innerHTML = cartNumMinus
     firebase.database().ref('cart').child(e.id).remove()
     firebase.database().ref('total').child(e.id).remove()
     e.parentNode.parentNode.remove()
      
    //   var forMinus = e.parentNode.childNodes[1].childNodes[1].innerHTML
    // //  console.log(selectSpanText - forMinus)
    //  console.log(forMinus)
    //  console.log(selectSpanText)
    //  console.log(parseFloat(selectSpanText))
    //  minus()
     
}


function delAll() {
    var cart = document.getElementById("main-div")
    cart.innerHTML = ""
    firebase.database().ref('cart').remove()
    firebase.database().ref('total').remove()
    selectSpan.innerHTML = ""
    console.log(submitTotal)
    // submitTotal.innerHTML = ""
    cartNum.innerHTML = 0

}

// setInterval( function(){
//     var logo = document.getElementById("logo1");
//     logo.className += " ";
// }, 2000)




// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


var take = 0;
function send (){
  
     var name = document.getElementById("inputName").value
     var email = document.getElementById("inputEmail").value
     var address1 = document.getElementById("inputAddress").value
     var address2 = document.getElementById("inputAddress2").value
     var city = document.getElementById("inputCity").value
     var state = document.getElementById("inputState").value
     var zip = document.getElementById("inputZip").value
    
    var key1 = firebase.database().ref('contact').push().key
    var obj1 = {
        key: key1,
        name: name,
        email: email,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip
    }
    
    var check2 = [name, email, address1, city, state, zip]
    for(var i = 0; i < check2.length; i++){
        if(check2[i] === ""){
            take = document.getElementById("exampleModal")
            take.childNodes[1].childNodes[1].childNodes[3].innerHTML = " Please Fill Out All The Fields ! "
             return
         }  
    } 
    
    firebase.database().ref('contact').child(key1).set(obj1)
    take.childNodes[1].childNodes[1].childNodes[3].innerHTML = " Your Order is Successfully Placed !"
}
