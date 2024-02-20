function getList() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var todos = JSON.parse(xhr.responseText);
        var usersMap = {};
        var usersRequest = new XMLHttpRequest();
        usersRequest.open("GET", "https://jsonplaceholder.typicode.com/users", true);
        usersRequest.onreadystatechange = function() {
          if (usersRequest.readyState == 4 && usersRequest.status == 200) {
            var users = JSON.parse(usersRequest.responseText);
            users.forEach(function(user) {
              usersMap[user.id] = user.name;
            });
            populateTable(todos, usersMap);
          }
        };
        usersRequest.send();
      }
    };
    xhr.send();
  }
  
  function populateTable(todos, usersMap) {
    var tbody = document.querySelector("#todoTable tbody");
    tbody.innerHTML = "";
    todos.forEach(function(todo, index) {
      var row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${usersMap[todo.userId]}</td>
        <td>${todo.title}</td>
        <td><input type="checkbox" ${todo.completed ? "checked" : ""} disabled/></td>
      `;
      tbody.appendChild(row);
    });
  }