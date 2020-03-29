import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


function RequestRecordingForm() {

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  }
//   console.log(errors);

  return (
    <div className="RequestRecordingForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" placeholder="bpm" name="bpm" ref={register({required: true, maxLength: 100, min: 1})} />
        <input type="number" placeholder="# of measures" name="measures" ref={register({required: true, maxLength: 4, min: 1})} />
        <input type="number" placeholder="ex: 4" name="time_signature_numerator" ref={register({required: true, min: 1})} />
        <input type="number" placeholder="ex: 4" name="time_signature_denominator" ref={register({required: true, min: 1})} />

        <input type="submit" />
      </form>

    </div>
  );
}

export default RequestRecordingForm;
