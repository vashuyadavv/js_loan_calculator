//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    e.preventDefault();
    
    //Hide results
    document.getElementById('results').style.display='none';

    //Show loader
    document.getElementById('loading').style.display='block';

    setTimeout(calculateResults, 2000);
});
    

    

//Calculate results
function calculateResults(){
    
    //console.log('calculating...')
    
    //UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    
    // console.log(interest);
    // console.log(amount);
    // console.log(years);
    
    //Result UI vars
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments= parseFloat(years.value) * 12;
    // console.log(calculatedPayments);
    // console.log(calculatedInterest);
    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
    
    //console.log(monthly);
    
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        
        //show result
        document.getElementById('results').style.display='block';

        //Hide loader
        document.getElementById('loading').style.display='none';
    }else{
        //console.log('check again');
        showError('Please check your number');
        document.getElementById('loading').style.display='none';
    }
    
}

//Show error
function showError(error){
    //create a div
    const errorDiv=document.createElement('div');
    
    //Get elements
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');
    //console.log(card);
    //console.log(heading)
    //Add class
    errorDiv.className='alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 2000);
}

//Clear error
function clearError(){
    document.querySelector('.alert').remove();
}