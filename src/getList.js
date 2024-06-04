export function getList() {
    return fetch('http://localhost:8080/projeto')
      .then(data => data.json())
  } 
  
 