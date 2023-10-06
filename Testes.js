function RequestUsers() {
  let Users = RequestGet('http://localhost:8080/users');
  let UserDiv = document.getElementById('UserInformations');
  UserDiv.innerHTML = '';

  if (Users.length == 0) {
    console.log("Não há usuários cadastrados");
    UserDiv.innerHTML = 'Não há usuários cadastrados';
  }
  else{
  for (let i = 0; i < Users.length; i++) {
    const User = Users[i];
    UserDiv.innerHTML += '<p>Nome: ' + User.name + '</p>';
    UserDiv.innerHTML += '<p>Email: ' + User.email + '</p>';
    UserDiv.innerHTML += '<p>Departamento: ' + User.department.name + '</p>';
    UserDiv.innerHTML += '<p>Id: ' + User.id + '</p>';
    UserDiv.innerHTML += '<hr>';
  }
  }

  console.log(Users);
}

function RequestUsersById() {

  let Id = document.getElementById('IdUsers').value;

  let Users = RequestGet('http://localhost:8080/users/search?id=' + Id);
  console.log(Users);

  if (Users.success !== false) {
    let User = Users[0];

    UserIdDiv = document.getElementById('UserIdInfo');

    UserIdDiv.innerHTML = '';
    UserIdDiv.innerHTML += '<p>Nome: ' + User.name + '</p>';
    UserIdDiv.innerHTML += '<p>Email: ' + User.email + '</p>';
    UserIdDiv.innerHTML += '<p>Departamento: ' + User.department.name + '</p>';
  }


}


function PostUsers() {
  document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    var jsonData = {
      name: formData.get("nome"),
      email: formData.get("email"),
      department: {
        id: parseInt(formData.get("department"), 10)
      }
    };
    var url = "http://localhost:8080/users";

    RequestPost(url, jsonData)
    .then(response => {
      console.log("Resposta da requisição:", response);
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
    });
  });
};
PostUsers();


function RequestPatch(URL, DATA) {
  return new Promise((resolve, reject) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PATCH", URL);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("Accept", "application/json");
    xmlhttp.onload = () => resolve(JSON.parse(xmlhttp.responseText));
    xmlhttp.onerror = () => reject(xmlhttp.statusText);
    xmlhttp.send(JSON.stringify(DATA));
  });
}

function submitEditForm() {
  const userId = parseInt(document.getElementById("userId").value);
  const name = document.getElementById("name2").value;
  const email = document.getElementById("email2").value;
  const departmentId = parseInt(document.getElementById("department2").value);

  const formData = {
    name: name,
    email: email,
    department: {
      id: departmentId
    }
  };

  const urlDoEndpoint = `http://localhost:8080/users/${userId}`;

  RequestPatch(urlDoEndpoint, formData)
    .then(response => {
      console.log("Resposta da requisição:", response);
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
      // Lida com o erro, se necessário
    });
}

