import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';
import { deleteEvent, fetchEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EventDetails() {

  const navigate = useNavigate();
  const id = useParams().id;
  
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ['events', id],
    queryFn: async ({ signal }) => fetchEvent({id, signal})
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ['events', id],
    mutationFn: () => deleteEvent({id}),
    onSuccess: () => {
      navigate('../');
    }
  });
  
  function handleDelete(){
    mutate({id});
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      { isError && <ErrorBlock title={error.title} message={error.info?.message ?? error.message} /> }
      { isFetching && <LoadingIndicator /> }
      { data &&
        <article id="event-details">
          <header>
            <h1>{ data.title }</h1>
            <nav>
              { isDeleting ? <LoadingIndicator /> : <button onClick={handleDelete}>Delete</button> }
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{ data.location }</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{ data.date } @ { data.time }</time>
              </div>
              <p id="event-details-description">{ data.description }</p>
            </div>
          </div>
        </article>
      }
    </>
  );
}
