$(document).ready(function () {
  // Set form variable
  var form = $('#addItem-formm');

  form.submit(function (event) {
    var productname = $('#productname').val();
    var productdetails = $('#productdetails').val();
    var producthighlights = $('#producthighlights').val();
    var price = $('#price').val();
    var quantityremaining = $('#quantityremaining').val();
    var dateofmanufacture = $('#dateofmanufacture').val();
    var dateofexpiry = $('#dateofexpiry').val();
    var shopId = $('shopId').innerHTML;
    if ($.trim(productname) != '' && $.trim(productdetails) != '' &&
      $.trim(producthighlights) != '' && $.trim(price) != '' &&
      $.trim(quantityremaining) != '' && $.trim(dateofmanufacture) != '' &&
      $.trim(dateofexpiry) != '') {
      // Process AJAX request
      $.post('http://localhost:3001/shopId/'+shopId, {
        productname: productname,
        productdetails: productdetails,
        producthighlights: producthighlights,
        price: price,
        quantityremaining: quantityremaining,
        dateofmanufacture: dateofmanufacture,
        dateofexpiry: dateofexpiry
      }, function (data) {
        console.log(data);
      });
    }
    // Prevent default form action
    event.preventDefault();
  });
});


$('#edit').click(function (event) {
  // event.preventDefault();
  var text = $('.text-info').text();
  var input = $('<input id="attribute" type="text" value="' + text + '" />')
  $('.text-info').text('').append(input);
  input.select();

  input.blur(function () {
    var text = $('#attribute').val();
    $('#attribute').parent().text(text);
    $('#attribute').remove();
  });
});

$('#edit2').click(function (event) {
  // event.preventDefault();
  var text2 = $('.text-info2').text();
  var input2 = $('<input id="attribute2" type="text" value="' + text2 + '" />')
  $('.text-info2').text('').append(input2);
  input2.select();

  input2.blur(function () {
    var text2 = $('#attribute2').val();
    $('#attribute2').parent().text(text2);
    $('#attribute2').remove();
  });
});


function increment() {
  // event.preventDefault();
  document.getElementById('demoInput').stepUp();
}

function decrement() {
  document.getElementById('demoInput').stepDown();
}
// $scope.checkErr = function(startDate,endDate) {
//   $scope.errMessage = '';
//   var curDate = new Date();

//   if(new Date(startDate) > new Date(endDate)){
//     $scope.errMessage = 'End Date should be greater than start date';
//     return false;
//   }
//   if(new Date(startDate) < curDate){
//      $scope.errMessage = 'Start date should not be before today.';
//      return false;
//   }
// };

// $("#addItem-form").change(function () {
//   var startDate = document.getElementById("StartDate").value;
//   var endDate = document.getElementById("EndDate").value;

//   if ((Date.parse(startDate) <= Date.parse(endDate))) {
//     alert("End date should be greater than Start date");
//     document.getElementById("EndDate").value = "";
//   }
// });

// const staticForm = document.getElementById('addItem-form');

// staticForm.addEventListener('change', function() {
//   if (start.value) end.min = start.value;
// }, false);


// start.addEventListener('change', function() {
//   if (start.value) end.min = start.value;
// }, false);

// (function (req, res) {
//   const checkMethods = {
//     checkValidation(productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry) {
//       if (!productname) throw 'Must provide productname'
//       if (!productdetails) throw 'Must provide productname'
//       // if (!producthighlights) throw 'Must provide productname'
//       // if (!price) throw 'Must provide productname'
//       return;
//     }
//   };

//   const staticForm = document.getElementById('addItem-form');

//   if (staticForm) {

//     staticForm.addEventListener('change', function() {
//       if (start.value) end.min = start.value;
//     }, false);

//     var shopId = document.getElementById('shopId').innerHTML;
//     //console.log(shopId)
//     const productname = document.getElementById('productname');
//     const productdetails = document.getElementById('productdetails');
//     //, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry

//     const errorContainer = document.getElementById('error-container');
//     const errorTextElement = errorContainer.getElementsByClassName(
//       'text-goes-here'
//     )[0];

//     // Event listener
//     staticForm.addEventListener('submit', (event) => {
//       event.preventDefault();

//       try {

//         errorContainer.classList.add('hidden');
//         const productnamevalue = productname.value;
//         const productdetailsvalue = productdetails.value;
//         checkMethods.checkValidation(productnamevalue, productdetailsvalue)
//         // location.href = "www.yoursite.com";
//        window.location.href = "http://localhost:3001/shopId/" + shopId;


//       } catch (e) {
//         const message = typeof e === 'string' ? e : e.message;
//         errorTextElement.textContent = e;
//         errorContainer.classList.remove('hidden');
//       }
//     });
//   }
// })();