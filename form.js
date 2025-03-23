document.addEventListener('DOMContentLoaded',()=>{
    postForm(event);
})
function postForm(event){
    event.preventDefault();
    const name = event.target.name.value;
    console.log(name)
    const email =  event.target.email.value;
    const password = event.target.password.value;
     axios.post(`http://localhost:3000/user/signup`,{
        username : name,
        useremail : email,
        userPass : password
     })
     .then(res=>{
        console.log(`respond send successfully`)
     }).catch(err=>{
        console.error(`error in sending sign up data`);
     })

}