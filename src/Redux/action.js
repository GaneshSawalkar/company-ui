import axios from 'axios';

export function getEmployee(data) {
    console.log('called', obj);
    var obj = {}
    obj.page = data.currentPage
    obj.limit= data.perPage
    obj.searchText = data.searchText
    return function(dispatch) {
        return axios.post("http://localhost:4000/api/getAllPagination", obj)
          .then(( data ) => {
              console.log("ddddddddddw", data)
            //   if(data.data === []){
            //       data.data = "No data Found"
            //   }
          dispatch({
                     type: 'GET_EMPLOYEE',
                     payload: data.data
                 });
        });
      };
};

export function addEmployee(data) {
    return function(dispatch) {
        return axios.post("http://localhost:4000/api/create", data)
          .then(( data ) => {
              console.log(data,"sssssssssssssssssss")
          dispatch({
                     type: 'GET_EMPLOYEE',
                     payload: data.data
                 });
        });
      };
};

export function editEmployee(data) {
    return function(dispatch) {
        return axios.put(`http://localhost:4000/api/update/${data.id}`, data)
          .then(( data ) => {
              console.log("ddddddddddw", data)
          dispatch({
                  type: 'EDIT_EMPLOYEE',
                     payload: data.data
                 });
        });
      };
};

export function deleteEmployee(employeeId) {
    return function(dispatch) {
        return axios.delete(`http://localhost:4000/api/${employeeId}`)
          .then(( data ) => {
              console.log("ddddddddddw", data)
              if(data.data.deletedCount===1){
                  var abc = employeeId
              }
          dispatch({
                     type: 'DELETE_EMPLOYEE',
                     payload: abc
                 });
        });
      };
};