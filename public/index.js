//////API routes//////////////
const Appapi = (() => {
const baseurl = "http://localhost:3000";
const path='events'

/////get all Events//////

const getEvents = () =>{
    fetch([baseurl,path].join("/")).then((response) => response.json());
}
/////Create new Events

// dummydata const todo=
//{eventName: "TEST",
// startDate: "1641790800000",
// endDate: "1641790800000",
//}
const addEvent = (event) =>
  fetch([baseurl, path]
      .join("/"), {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
      "Content-type": "application/json",
      },})
      .then((response) => response.json());

/////delete task
const deleteEvent = (id) =>
  fetch([baseurl, path, id].join("/"), {       method: "DELETE" });

///// update event////
const updateEvent = (event) =>
  fetch([baseurl, path]
      .join("/"), {
      method: "PUT",
      body: JSON.stringify(event),
      headers: {
      "Content-type": "application/json",
      },})
      .then((response) => response.json());

return {
  deleteEvent,
  getEvents,
  addEvent,
  updateEvent
  };
})();

console.log('Appapi==>',Appapi);


const View=(()=>{
  const domStr={
    eventList:'#eventlist-container',
    editBtn:'.edit',
    deleteBtn:'.delete'
  };

  const render=(element,template)=>{
    element.innerHTML=template
  };

  const createTemplate=(arr)=>{
    let template='';

    arr.forEach((eachEl)=>{
      // template+=`
      // <tr>
      //   <td>
      //     <input disabled value="TEST-3" />
      //   </td>
      //   <td>
      //     <input type="date" value="2020-01-08" />
      //   </td>
      //   <td>
      //     <input disabled />
      //   </td>
      //   <td>
      //     <button class='edit'>EDIT</button>
      //     <button class='delete'>DELETE</button>
      //   </td>
      // </tr>`
    })
  }
})
