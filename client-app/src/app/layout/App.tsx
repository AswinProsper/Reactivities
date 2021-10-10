import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './navBar';
import ActivityDashboard from '../../Features/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';


function App() {
  const [activities,setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);

  useEffect(()=>{
  axios.get<Activity[]>('http://localhost:5000/Api/Activity').then(response =>{
  setActivities(response.data);
  }) 
  },[] )

  function handelSelectActivity(id:string){
      setSelectedActivity(activities.find(x=>x.id === id));
  }

  function cancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string){
    id?handelSelectActivity(id) : cancelSelectedActivity();
    setEditMode(true);
  }

  function handleCloseForm(){
    setEditMode(false);
  }

  function createOrEditActivity(activity: Activity){
    activity.id?setActivities([...activities.filter(x=>x.id!==activity.id),activity]):
    setActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function handlleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id !== id)]);
  }
  return (
    

    <>
    <NavBar openForm={handleFormOpen}/>
      <Container style = {{marginTop:'7em'}}>
          <ActivityDashboard 
          activities={activities} 
          selectedActivity ={selectedActivity}
          selectActivity ={handelSelectActivity}
          cancelSelectedActivity = {cancelSelectedActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleCloseForm}
          createOrEdit = {createOrEditActivity}
          deleteActivity = {handlleDeleteActivity}
          />
      </Container>
              
      
              
    </>
  );
}

export default App;
