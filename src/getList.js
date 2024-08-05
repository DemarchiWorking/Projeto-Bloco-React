export function getList() {
    return fetch('http://localhost:8761/project')
      .then(data => data.json())
  } 
  
 