import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, editEvent, queryClient } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const id = useParams().id;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ id, signal })
  });
  
  const { mutate, isFetchingEdit, isErrorEdit, errorEdit } = useMutation({
    mutationKey: ['events', id],
    mutationFn: editEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', id] });
      navigate('../');
    }
  });

  function handleSubmit(formData) {
    formData['id'] = id;
    mutate({ event: formData});
  }

  function handleClose() {
    navigate('../');
  }

  let content = null;
  if(isLoading){
    content = <LoadingIndicator />;
  }
  else if(isError){
    content = <ErrorBlock title={error.title} message={error.message} />
  }
  else if(data){
    content = <>
      
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        { isFetchingEdit && <LoadingIndicator /> }
        { isErrorEdit &&  <ErrorBlock title={errorEdit.title} message={errorEdit.message} /> }
        { !isFetchingEdit && !isErrorEdit && <button type="submit" className="button">
            Update
          </button>
        }
      </EventForm>
    </>;
  }

  return (
    <Modal onClose={handleClose}>
      { content }
    </Modal>
  );
}
