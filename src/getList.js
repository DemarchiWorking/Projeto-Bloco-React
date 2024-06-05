export function getList() {
    return fetch('http://localhost:8080/project')
      .then(data => data.json())
  } 
  
 