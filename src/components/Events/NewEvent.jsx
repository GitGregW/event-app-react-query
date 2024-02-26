import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { createNewEvent, queryClient } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      });
      navigate('../');
    }
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  const inputData = useRef();

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm inputData={inputData} onSubmit={handleSubmit}>
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
        { isError && <ErrorBlock title={error.title} message={error.message} /> }
        { isPending && <LoadingIndicator /> }
    </Modal>
  );
}
