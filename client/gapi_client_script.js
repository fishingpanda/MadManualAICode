 
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
      
    // if (response.ok) {
    //     const data = await response.json();
    //     console.log(data);
    //     var status  = data.data.values;
 
    //     jsonContainer.innerHTML = JSON.stringify(status);

    //     //const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
    //     //alert('ss')
    // } else {
    //     const err = await response.text()
    //     alert(err)
    // }


    // 
    // status = JSON.stringify(status);

    

  }
  
  function createList(data) {
    jsonContainer.innerHTML = JSON.stringify(data);
    
    console.log(data.length);
    console.log(data[0][0]);

    const dropdown = document.getElementById("myDropdown");

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.text = data[0][0];
        option.value =data[0][0];
        dropdown.appendChild(option);   
    }    

    const mainUL = document.createElement('ol');
    for (let i = 0; i < data.length; i++) {
      const studentLI = document.createElement('li');
      studentLI.innerHTML = data[0][0];

      // create list for marks
      const marksUL = document.createElement('ul');
      const marksLI = document.createElement('li');        
      marksLI.innerHTML = data[0][1];
      marksUL.appendChild(marksLI);
      
      // append marks list to studentLI
      studentLI.appendChild(marksUL);
      // append student list to mainUL
      mainUL.appendChild(studentLI);
    }
    // append mainUL to body
    document.body.appendChild(mainUL);
  }
    
  
  form.addEventListener('submit', handleSubmit)
  form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
  })