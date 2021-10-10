
import  { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";

interface Props{
    closeForm:()=>void;
    activity:Activity | undefined;
    createOrEdit:(selectedActivity:Activity)=>void;
}

export default function ActivityForm({closeForm,activity:selectedActivity,createOrEdit}:Props){

    const initialActivity = selectedActivity??{
    id : '',
    description:'',
    date:'',
    city:'',
    venue:'',
    category:'',
    title:''
}
    const [activity,setActivity] = useState(initialActivity);

    function handleSubmit(){
        createOrEdit(activity);
    }
    function handleChangeEvent(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){

    const {name,value} = event.target;
    
    setActivity({...activity,[name]:value})
    }

    

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder = 'Title' value = {activity.title} name = 'title' onChange={handleChangeEvent} />
                <Form.TextArea placeholder = 'Description' value = {activity.description} name = 'description' onChange={handleChangeEvent}/>
                <Form.Input placeholder = 'Date' value = {activity.date} name = 'date' onChange={handleChangeEvent}/>
                <Form.Input placeholder = 'City' value = {activity.city} name = 'city' onChange={handleChangeEvent}/>
                <Form.Input placeholder = 'Venue' value = {activity.venue} name = 'venue' onChange={handleChangeEvent}/>
                <Form.Input placeholder = 'Category' value = {activity.category} name = 'category' onChange={handleChangeEvent}/>
                <Button floated='right' positive type = 'submit' content = 'Submit' />
                <Button onClick={closeForm} floated ='right'  type = 'button' content = 'Cancel'/>
            </Form>
        </Segment>
    )
}