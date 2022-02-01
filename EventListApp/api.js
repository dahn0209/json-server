export const Appapi = (() => {
const baseurl = "http://localhost:3000";
const path='events'
/////get all Events//////
const getEvents = () =>{
    fetch([baseurl,path].join("/")).then((response) => response.json())
    .then((json) => console.log('GET=>',json));
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
      .then((response) => response.json())
       .then((json) => console.log('post=>',json));
/////delete task
const deleteEvent = (id) =>
  fetch([baseurl, path, id].join("/"), {       method: "DELETE" })
  .then((json) => console.log('DELETE=>',json));

///// update event////
const updateEvent = (event,id) =>
  fetch([baseurl, path, id]
      .join("/"), {
      method: "PUT",
      body: JSON.stringify(event),
      headers: {
      "Content-type": "application/json",
      },})
      .then((response) => response.json())
      .then((json) => console.log('UPDATE=>',json));

return {
  deleteEvent,
  getEvents,
  addEvent,
  updateEvent
  };
})();
