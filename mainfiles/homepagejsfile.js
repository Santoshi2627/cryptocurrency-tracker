let button = document.querySelectorAll('.getstartedbtn').forEach  (button => {
  button.addEventListener('click', () => {
    document.getElementById('form1').style.display = 'block'; // Show the form
    sec3.style.display = "block";
  });
});

let sec4=document.getElementById("about")
let sec3 = document.getElementById("sec3");
sec3.style.display = "none";
sec4.style.display="none";

// let sec3 = document.getElementById("sec3");
// sec3.style.display = "none";
// let submit=document.getElementById("submitbtn")
// submit.addEventListener("click",()=>{
//   sec3.style.display="none"
// })

let form = document.getElementById("form1");
let username = document.getElementById("username");
let email = document.getElementById("mail");
let sp1 = document.getElementById("sp1");
let spu = document.getElementById("spu");
let sp2 = document.getElementById("sp2");
let spe = document.getElementById("spe");
let onlyAlphabets = /^[a-zA-Z]+$/;
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // sec4.style.display="block"
  let isValid = true;

  if (username.value.length === 0) {
    sp1.style.display = "block";
    isValid = false;
  } else if (!onlyAlphabets.test(username.value)) {
    spu.style.display = "block";
    isValid = false;
  }

  if (email.value.length === 0) {
    sp2.style.display = "block";
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    spe.style.display = "block";
    isValid = false;
  }

  if (isValid) {
    alert("Your form was successfully submitted!");
    sec3.style.display = "none";
    sec4.style.display="block"
  }
});
