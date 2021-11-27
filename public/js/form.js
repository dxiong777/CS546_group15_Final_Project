(function () {
  const checkMethods = {
    checkValidation(productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry) {
      if (!productname) throw 'Must provide productname'
      if (!productdetails) throw 'Must provide productname'
      // if (!producthighlights) throw 'Must provide productname'
      // if (!price) throw 'Must provide productname'

    }
  };


  const staticForm = document.getElementById('addItem-form');

  if (staticForm) {

    const productname = document.getElementById('productname');
    const productdetails = document.getElementById('productdetails');
  
   
//, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry

    const errorContainer = document.getElementById('error-container');
    const errorTextElement = errorContainer.getElementsByClassName(
      'text-goes-here'
    )[0];
// Event listener
    staticForm.addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        errorContainer.classList.add('hidden');
        const productnamevalue = productname.value;
        const productdetailsvalue = productdetails.value;
        checkMethods.checkValidation(productnamevalue, productdetailsvalue)
      } catch (e) {
        const message = typeof e === 'string' ? e : e.message;
        errorTextElement.textContent = e;
        errorContainer.classList.remove('hidden');
      }
    });
  }
})();