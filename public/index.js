// import { Appapi } from './api'
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
  fetch([baseurl, path, id].join("/"),  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json; charset=UTF-8",
      },
    })
  .then((json) => console.log('DELETE=>',json));

///// update event////
const updateEvent = (event,id) =>
  fetch([baseurl, path, id]
      .join("/"),
     {  method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept:  "application/json; charset=UTF-8",
        },
        body: JSON.stringify(event),
      })
      .then((response) => response.json())
      .then((json) => console.log('UPDATE=>',json));

return {
  deleteEvent,
  getEvents,
  addEvent,
  updateEvent
  };
})();


//////View/////
const View=(()=>{
  const domStr={
    eventList:'#eventList-container',
    editBtn:'.edit-btn',
    deleteBtn:'.delete-btn',
    inputbox:'.eventlist-input'
  };

  const render=(element,template)=>{
    element.innerHTML=template
  };

  const createTemplate=(arr)=>{
    let template='';

    arr.forEach((eachEl)=>
      {
        template+=
        `<tr>
            <td>
              <input value='${eachEl.eventName}' />
            </td>
            <td>
              <input type="date" value="${eachEl.startDate}" />
            </td>
            <td>
              <input type="date" value="${eachEl.endDate}" />
            </td>
            <td id='${eachEl.id}>
              <button class='edit-btn>EDIT</button>
              <button class='delete-btn'>DELETE</button>
             </td>
         </tr>`;
      }
    )
    console.log('template==>',template)
    return template;
  };
  console.log('domStr==>',domStr);
  console.log('render==>',render);
  console.log('createTemplate=>',createTemplate)
  return {
    domStr,
    render,
    createTemplate
  };
})();

//////Model//////

const Model=((api,view)=>{

  class Event{
    constructor(eventName){
      this.id=id;
      this.eventName=eventName;
      this.startDate=startDate;
      this.endDate=endDate;
    }
  }

  console.log('this=>',this);

  class State{
    #eventList=[];

    get eventList(){
      console.log('get Eventlist==>',this.#eventList)
      return this.#eventList;
    }

    set eventList(newData){
      this.#eventList=newData;

      ///this will render the eventList
      const ele=document.querySelector(view.domStr.eventList)
      console.log('ele==>',ele)
      const tmp=view.createTemplate(this.#eventList);
      console.log('tmp=>',tmp)
      view.render(ele,tmp)
    }
  }
  const deleteEventModel=api.deleteEvent;
  const getEventsModel=api.getEvents;
  console.log('getEventsModel==>',getEventsModel);
  const addEventModel=api.addEvent;
  const updateEventModel=api.updateEvent;

  return {
    Event,
    State,
    deleteEventModel,
    getEventsModel,
    addEventModel,
    updateEventModel
  };
})(Appapi,View);

///Contoller

const Controller=((model,view)=>{
  const state=new model.State();
  console.log('state=>',state);

  const init = () => {
      model.getEvents().then((data) => {
          state.eventList = data;
        });
    };

  console.log('stateAfter==>',state);

   const bootstrap = () => {
        init();
    };

    return {bootstrap}
})(Model,View);


Controller.bootstrap();
