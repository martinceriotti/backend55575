const form = document.getElementById("deleteForm");
document.querySelector("[name=borrar]").addEventListener('click', deleteUser = (e) =>{
  e.preventDefault();
  console.log("delefe")
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  console.log(obj._id)
  fetch(`/api/users/${obj._id}`, {
    method: "DELETE",
    // body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 200) {
      window.location.replace("/api/views/logout");
    }
  });
});
document.querySelector("[name=actualizar]").addEventListener('click', updateUser = (e) => {
  e.preventDefault();
  
  const data = new FormData(form);
  const obj = {};
  
  data.forEach((value, key) => (obj[key] = value));
 
  fetch(`/api/users/${obj._id}`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(result => {
    console.log(result.status)
    if (result.status === 200) {
        window.location.replace('/api/views/logout');
    }
})
});

