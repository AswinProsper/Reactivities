import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";
import ActivityForm from "../activities/ActivityForm";
import ActivityDetails from "../activities/details/ActivityDetails";
import ActivityList from "./ActivityList";

interface ActivityProps{
    activities:Activity[];
    selectedActivity:Activity | undefined;
    selectActivity:(id:string)=>void;
    cancelSelectedActivity:()=>void;
    editMode:boolean;
    openForm:(id:string) =>void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
}

export default function ActivityDashboard({activities,selectedActivity,selectActivity
    ,cancelSelectedActivity
    ,editMode,openForm,closeForm
    ,createOrEdit,deleteActivity}:ActivityProps){
    return(
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} selectActivity={selectActivity} 
                handleDelete={deleteActivity}></ActivityList>
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity && !editMode &&
                <ActivityDetails activity = {selectedActivity} 
                cancelSelectedActivity = {cancelSelectedActivity}
                openForm={openForm}
                />}
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>}
            </Grid.Column>
        </Grid>
    )
}
