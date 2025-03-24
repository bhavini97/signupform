document.addEventListener('DOMContentLoaded',()=>{
    postForm(event);
})
function postForm(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email =  event.target.email.value;
    const password = event.target.password.value;
     axios.post(`http://localhost:3000/user/signup`,{
        username : name,
        useremail : email,
        userPass : password
     })
     .then(res=>{
        alert(res.data.message);
        console.log(`respond send successfully`)
     }).catch(err=>{
      if (err.response) {
         alert(err.response.data.message); 
     } else {
         console.error(`Error in sending signup data`, err);
         alert('Something went wrong. Please try again.');
     }
})

};

function getForm(event){
   event.preventDefault();
   const name = event.target.name.value;
   const email =  event.target.email.value;
   const password = event.target.password.value;
    axios.post(`http://localhost:3000/user/login`,{

         email: email,
         password: password
     })
    
    .then(response=>{
      alert(response.data.message);
            console.log("Success:", response.data);
     
     }). catch (error=> {
      if (error.response) {
         if (error.response.status === 404) {
             alert( error.response.data.message); // User not found
         } else if (error.response.status === 401) {
             alert(error.response.data.message); // Invalid password
         } else {
             alert(error.response.data.message);
         }
     } else {
         alert("Network Error: Unable to connect to server.");
     }
     console.error("Error:", error);
 })
     
};