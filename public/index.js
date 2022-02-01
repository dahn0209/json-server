// // import { Appapi } from './api'
//  const Appapi = (() => {
// const baseurl = "http://localhost:3000";
// const path='events'
// /////get all Events//////
// const getEvents = () =>{
//     fetch([baseurl,path].join("/")).then((response) => response.json())
//     .then((json) => console.log('GET=>',json));
// }
// /////Create new Events
// // dummydata const todo=
// //{eventName: "TEST",
// // startDate: "1641790800000",
// // endDate: "1641790800000",
// //}
// const addEvent = (event) =>
//   fetch([baseurl, path]
//       .join("/"), {
//       method: "POST",
//       body: JSON.stringify(event),
//       headers: {
//       "Content-type": "application/json",
//       },})
//       .then((response) => response.json())
//        .then((json) => console.log('post=>',json));
// /////delete task
// const deleteEvent = (id) =>
//   fetch([baseurl, path, id].join("/"),  {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json; charset=UTF-8",
//       },
//     })
//   .then((json) => console.log('DELETE=>',json));

// ///// update event////
// const updateEvent = (event,id) =>
//   fetch([baseurl, path, id]
//       .join("/"),
//      {  method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Accept:  "application/json; charset=UTF-8",
//         },
//         body: JSON.stringify(event),
//       })
//       .then((response) => response.json())
//       .then((json) => console.log('UPDATE=>',json));

// return {
//   deleteEvent,
//   getEvents,
//   addEvent,
//   updateEvent
//   };
// })();
// //////View/////
// const View=(()=>{
//   const domStr={
//     eventList:'#eventList-container',
//     editBtn:'.edit-btn',
//     deleteBtn:'.delete-btn',
//     inputbox:'.eventlist-input'
//   };

//   const render=(element,template)=>{
//     element.innerHTML=template
//     console.log('element==>',element)
//   };

//   const createTemplate=(arr)=>{
//     let template='';

//     arr.forEach((eachEl)=>
//       {
//         template+=
//         `<tr>
//             <td>
//               <input value='${eachEl.eventName}' />
//             </td>
//             <td>
//               <input type="date" value="${eachEl.startDate}" />
//             </td>
//             <td>
//               <input type="date" value="${eachEl.endDate}" />
//             </td>
//             <td id='${eachEl.id}>
//               <button class='edit-btn id='${eachEl.id}>EDIT</button>
//               <button class='delete-btn'id='${eachEl.id}>DELETE</button>
//              </td>
//          </tr>`;
//       }
//     )
//     console.log('template==>',template)
//     return template;
//   };
//   console.log('domStr==>',domStr);
//   console.log('render==>',render);
//   console.log('createTemplate=>',createTemplate)
//   return {
//     domStr,
//     render,
//     createTemplate
//   };
// })();

// //////Model//////

// const Model=((api,view)=>{

//   class Event{
//     constructor(eventName){
//       this.id=id;
//       this.eventName=eventName;
//       this.startDate=startDate;
//       this.endDate=endDate;
//     }
//   }

//   class State{
//     #eventList=[];

//     get eventList(){
//       console.log('get Eventlist==>',this.#eventList)
//       console.log('this==',this);
//       console.log('this.#eventList;==>',this.#eventList)
//       return this.#eventList;
//     }

//     set eventList(newData){
//       this.#eventList=newData;

//       ///this will render the eventList
//       const ele=document.querySelector(view.domStr.eventList)
//       console.log('ele==>',ele)
//       const tmp=view.createTemplate(this.#eventList);
//       console.log('tmp=>',tmp)
//       view.render(ele,tmp)
//     }
//   }
//   const deleteEventModel=api.deleteEvent;
//   const getEventsModel=api.getEvents;
//   const addEventModel=api.addEvent;
//   const updateEventModel=api.updateEvent;
//   console.log('api==>',api);

//   return {
//     Event,
//     State,
//     deleteEventModel,
//     getEventsModel,
//     addEventModel,
//     updateEventModel
//   };
// })(Appapi,View);

// ///Contoller

// const Controller=((model,view)=>{
//   const state=new model.State();
//   console.log('state=>',state);

//   const init = () => {
//       model.getEventsModel().then((data) => {
//           state.eventList = data;
//         });
//     };

//   console.log('stateAfter==>',state);

//    const bootstrap = () => {
//         init();
//     };

//     return {bootstrap}
// })(Model,View);


// Controller.bootstrap();

const baseurl = "http://localhost:3000";
const path = "events";

let taskListHolder=document.getElementById("incomplete-tasks");

//////GET  show all events//////
async function getEvents(){
  const response= await fetch([baseurl, path].join("/"))
  const data=await response.json()
  return data
}

getEvents()
.then(data=>{
  data.forEach(eachData=>{

    let taskRow=document.createElement('tr');
  ////EventName////
    let taskDes=document.createElement('td');
    taskDes.class='event-name'
    let taskInput=document.createElement('input');
    taskInput.type='text';
    taskInput.value=`${eachData.eventName}`;
    ////startDate///
    let taskDesStart=document.createElement('td');
    taskDesStart.class='start-date'
    let taskStartInput=document.createElement('input');
    taskStartInput.type='date';
    let startDateConvert=new Date(eachData.startDate);
    console.log('startDateConvert==>',startDateConvert);

    taskStartInput.value=`${eachData.startDate}`
    ////endDate///
     let taskDesEnd=document.createElement('td');
    taskDesEnd.class='end-date'
    let taskEndInput=document.createElement('input');
    taskEndInput.type='date';
    taskEndInput.value=`${eachData.endDate}`
    ///buttons//////
    let taskDesButton=document.createElement('td');
    let editButton=document.createElement('button')
    editButton.class='edit';
    editButton.innerText='Edit'
    let deleteButton=document.createElement('button')
    deleteButton.class='delete';
    deleteButton.innerText='Delete'

    ////appendChild section
    taskListHolder.appendChild(taskRow);
          ////EventName////
    taskRow.appendChild(taskDes);
    taskDes.appendChild(taskInput)
          /////startDate///
    taskRow.appendChild(taskDesStart);
    taskDesStart.appendChild(taskStartInput);
          ////endDate/////
    taskRow.appendChild(taskDesEnd);
    taskDesEnd.appendChild(taskEndInput)
          //////Button///////
    taskRow.appendChild(taskDesButton)
    taskDesButton.appendChild(editButton)
    taskDesButton.appendChild(deleteButton)
  })
})
.catch(err=>console.log('error==>' + err.message))


////Add New Event//////POST//////

let newTaskRow= document.getElementsByClassName("new-task");
console.log('newTaskRow==>',newTaskRow);


async function addEvent(eventName,startDate,endDate){

  const response=await fetch([baseurl, path].join("/"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(eventName,startDate,endDate),
      });
  const data=await response.json
  return data;
}

addEvent().then(data=>{
  console.log('AddEvent-data=>',data)
})
.catch(err=>console.log('error==>' + err.message))




 let taskRow=document.createElement('tr');
  ////EventName////
    let taskDes=document.createElement('td');
    taskDes.class='event-name'
    let taskInput=document.createElement('input');
    taskInput.type='text';
    // taskInput.value=`${eachData.eventName}`;
    ////startDate///
    let taskDesStart=document.createElement('td');
    taskDesStart.class='start-date'
    let taskStartInput=document.createElement('input');
    taskStartInput.type='date';
    // taskStartInput.value=`${eachData.startDate}`
    ////endDate///
     let taskDesEnd=document.createElement('td');
    taskDesEnd.class='end-date'
    let taskEndInput=document.createElement('input');
    taskEndInput.type='date';
    // taskEndInput.value=`${eachData.endDate}`
    ///buttons//////
    let taskDesButton=document.createElement('td');
    let editButton=document.createElement('button')
    editButton.class='edit';
    editButton.innerText='Edit'
    let deleteButton=document.createElement('button')
    deleteButton.class='delete';
    deleteButton.innerText='Delete'

    ////appendChild section
    taskListHolder.appendChild(taskRow);
          ////EventName////
    taskRow.appendChild(taskDes);
    taskDes.appendChild(taskInput)
          /////startDate///
    taskRow.appendChild(taskDesStart);
    taskDesStart.appendChild(taskStartInput);
          ////endDate/////
    taskRow.appendChild(taskDesEnd);
    taskDesEnd.appendChild(taskEndInput)
          //////Button///////
    taskRow.appendChild(taskDesButton)
    taskDesButton.appendChild(editButton)
    taskDesButton.appendChild(deleteButton)
