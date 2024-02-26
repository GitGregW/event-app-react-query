## React Query Project - Event App
<p align="center"><img style="width: 56px; height: 56px; margin: 7px 0; fill: #facc15;" src="public/events-logo.png" /></p>

React - The Complete Guide 2024 (incl. React Router & Redux)
- Event app using React Query / Tanstack Query to handle HTTP Requests

Requirements:
- Load event details dynamically with useQuery with consideration of isLoading property
- Enabling the Delete events functionality with consideration of useMutation and isPending property
- - Basic testing to ensure error handling is present

Completed:
- useQuery hook (fetch, error handling and isLoading):
- - to fetch selectable form images (EventForm.jsx)
- - fetch the event details with useParams to get the id from the url (EventDetails.jsx)
- - to display all recent events (NewEventsSection.jsx)

- useMutate hook (persist, manage error handling and pending status)
- - to post new events (NewEvent.jsx)

- Both useQuery and useMutate to fetch and update the according event (EditEvent.jsx)

- /util/http.js added editEvent function to manage the PUT request to the backend