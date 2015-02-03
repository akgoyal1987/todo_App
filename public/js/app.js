var app = angular.module("todoApp", ["xeditable", "ui.bootstrap"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.controller('TodoController', function($scope, $filter, $http) {
  $scope.todos = [];
  $scope.getTodos = function(){
    $http.get('/todos')
    .success(function(response, code){
      if(response.success && code==200){
        $scope.todos = response.todos;
      }        
    })    
    .error(function(err){
      alert(err);
    });
  }
  $scope.getTodos();


  $scope.saveTodo = function(data, id) {
    //$scope.todo not updated yet
    angular.extend(data, {_id: id});
    if(data._id)
      return $http.put('/todos/'+id, data);
    else
      $http.post('/todos', data)
      .success(function(response, code){
        if(code==200)
          $scope.deleteNewTodo(response.todo);
      })
      .error(function(response){
        
      });
  };

  $scope.validateData = function(data, fieldname) {
    if(!data || data=='')
      return fieldname+" is required"; 
  };

  // remove todo
  $scope.removeTodo = function(index) {
    console.log($scope.todos[index]._id);
    $http.delete('/todos/'+$scope.todos[index]._id)
    .success(function(response, code){
      if(response.success  && code==200){
        $scope.todos.splice(index, 1);
      }        
    })    
    .error(function(err){
      alert(err);
    });    
  };

  $scope.deleteNewTodo = function(todo){
      var todos = $scope.todos.filter(function(todo){
        if(todo._id)
          return true;
      });
      if(todo)
        todos.push(todo);
      $scope.todos = todos;
  };

  // add todo
  $scope.addTodo = function() {
    var newTodo = $scope.todos.filter(function(todo){
      if(!todo._id)
        return true;
    }); 
    if(newTodo.length==0){
      $scope.inserted = {
        title : '',
        note : '',
        due_date : '',
        priority : '',
        completed : false,
      };
      $scope.todos.push($scope.inserted);
    }      
  };
});
