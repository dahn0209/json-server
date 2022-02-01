import {Appapi} from '../EventListApp/api'

console.log('deee=>',Appapi);


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
      template+=`
      <tr>
        <td>
          <input value='${eachEl.eventName}' />
        </td>
        <td>
          <input type="date" value="${eachEl.startDate}" />
        </td>
        <td>
          <input type="date" value="${eachEl.endDate}" />
        </td>
        <td>
          <button class='edit'id="${eaclEl.id}">EDIT</button>
          <button class='delete' id='${eachEl.id}">DELETE</button>
        </td>
      </tr>`;
    })
    return template;
  }
  return {
    domStr,
    render,
    createTemplate

  }
})

const Model=((api,view)=>{
  class Event{
    constructor(eventName){
      this.userId=3;
      this.eventName=eventName;
      this.startDate=startDate;
      this.endDate=endDate;
    }
  }

  class State{
    #eventList=[];

    get eventList(){
      return this.#eventList;
    }

    set  eventList(newData){
      this.#eventList=newData;

      const ele=document.querySelector(view.domStr.eventList)
      const tmp=view.createTemplate(this.#eventList);
      view.render(ele,tmp)
    }
  }
  const deleteEventModel=api.deleteEvent;
  const getEventsModel=api.getEvents;
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
