import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';



function Record(props) {
  const firebase = props.firebase;
  const [database, setDatabase] = useState();
  const [errorMessage, setErrorMessage] = useState();
  // const firebaseConfig = props.firebaseConfig;
  useEffect(() => {
    console.log("setting up database?");
    setDatabase(firebase.database());
  })
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    const room_id = database.ref(data["room_id"]);
    room_id.once('value').then(dataSnapshot => {
      const thing = dataSnapshot.val()
      console.log("dataSnapshot.val()", thing);
      if (thing == null) {
        setErrorMessage("It looks like that room id isn't valid :(");
      } else {
        setErrorMessage("");
        room_id.set({
          recording: true
        });
      }
    });
    console.log("room_id: ", room_id);


  }
  return (
    <div className="Record">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="room id (1-10 chars)" name="room_id" ref={register({required: true, maxLength: 10, minLength: 4})} />
        <div>
          <input type="submit" className="btn btn-primary" value={"Start Recprdomg!!"}/>
        </div>
      </form>
      <div id="errormsg">{errorMessage}</div>

    </div>
  );
}

export default Record;
