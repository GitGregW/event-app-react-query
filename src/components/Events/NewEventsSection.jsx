import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
        { isError && <ErrorBlock title={error.title} message={error.message} /> }
        { isLoading && <LoadingIndicator /> }
        { !isError && !isLoading &&
          <ul className="events-list">
            {data.map((event) => (
              <li key={event.id}>
                <EventItem event={event} />
              </li>
            ))}
        </ul>
        }
    </section>
  );
}
