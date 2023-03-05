 
const form = document.querySelector('form');
const jsonContainer = document.querySelector('#json_container');

jsonContainer.innerHTML ="1231231";
 

const handleSubmit = async (e) => {
    e.preventDefault()  //prevent reloading the browser
  
    const data = new FormData(form) //get data from form
  
    // user's chatstripe
    jsonContainer.innerHTML +=  '099090909';
    // to clear the textarea input 
    form.reset()
  
    const response = await fetch('http://localhost:5001/')
        .then(response => response.json())
        .then(data => createList(data.data.values));
    

    

  }
  
  function createList(data) {
    jsonContainer.innerHTML = JSON.stringify(data);
    
    console.log(data.length);
    console.log(data[0][0]);

    const dropdown = document.getElementById("ddManufacturer");

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.text = data[i][0];
        option.value =data[i][0];
        dropdown.appendChild(option);   
    }    

    const ddApp  = document.getElementById("ddApplianceType");

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.text = data[i][1];
        option.value =data[i][1];
        ddApp.appendChild(option);   
    }    

  }
    
  
  form.addEventListener('submit', handleSubmit)
  form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
  })