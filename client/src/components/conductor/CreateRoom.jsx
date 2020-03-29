import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import firebase from 'firebase';


function CreateRoom(props) {
  console.log("props in CreateRoom: ", props);
  const firebase = props.firebase;
  const [database, setDatabase] = useState();
  // const firebaseConfig = props.firebaseConfig;
  useEffect(() => {
    console.log("setting up database?");
    // firebase.initializeApp(firebaseConfig);
    setDatabase(firebase.database());
    // database.ref(key).set(true);
  })
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    database.ref(data["room_id"]).set({
      recording: false
    });
  }
  return (
    <div className="CreateRoom">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="room id (1-10 chars)" name="room_id" ref={register({required: true, maxLength: 10, minLength: 4})} />
        <div>
        <input type="submit" className="btn btn-primary" value={"Create Room"}/>
        </div>
      </form>

    </div>
    // <div className="CreateRoom">
    //   <form>
    //     <label>
    //       Room ID:
    //       <input type="text" name="name" />
    //     </label>
    //
    //     {/*<button type="button" className="btn btn-primary">Create Room</button>*/}
    //     {/*<input type="submit" value="Submit" />*/}
    //   </form>
    //   <button type="button" className="btn btn-primary" onClick={createRoom}>Create Room</button>
    // </div>
  );
}

export default CreateRoom;
