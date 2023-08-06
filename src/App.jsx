import { useState } from "react";
import eventsData from "./data";
// import Attendees from "./Components/Attendees";
// import Event from "./Components/Event";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NewEventForm from "./Components/NewEventForm";
import Attendee from "./Components/Attendee";
import Attendees from "./Components/Attendees";

function App() {
  const [events, setEvents] = useState(eventsData);

  function handleAddEvent(event) {
    setEvents([event, ...events]);
  }

  function toggleEventAttendees(eventId) {
    const eventArray = [...events];
    const eventIndex = eventArray.findIndex((event) => eventId === event.id);
    const event = { ...eventArray[eventIndex] };
    event.showAttendees = !event.showAttendees;
    eventArray[eventIndex] = event;
    setEvents(eventArray);
  }

  function updateEventAttendance(eventId, attendeeId) {
    const eventArray = [...events];
    const eventIndex = eventArray.findIndex((event) => eventId === event.id);
    const event = { ...eventArray[eventIndex] };
    const personIndex = event.people.findIndex(
      (person) => person.id === attendeeId
    );
    const peopleArray = [...event.people];
    peopleArray[personIndex].attendance = !peopleArray[personIndex].attendance;
    event.people = peopleArray;
    eventArray[eventIndex] = event;
    setEvents(eventArray);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <div className="new-event">
          <NewEventForm handleAddEvent={handleAddEvent} />
        </div>
        <div className="events">
          <ul>
            {events.map((event) => {
              const { people: attendees, showAttendees } = event;
              // <Event  attendees={event.people} event = {event} updateEventAttendance = {updateEventAttendance} toggleEventAttendees = {toggleEventAttendees} />
              return (
                <>
                  <li key={event.id}>
                    <img src={event.eventImage} alt={event.name} />
                    <h5>
                      {event.name} {event.eventType}
                    </h5>
                    <br />
                    <span>Organized by: {event.organizer} </span>
                    <br />
                    <>
                    {/* <Attendees event = {event} attendees = {attendees} updateEventAttendance = {updateEventAttendance} toggleEventAttendees = {toggleEventAttendees} /> */}
                      <button onClick={() => toggleEventAttendees(event.id)}>
                        {!showAttendees ? "Show Attendees" : "Hide Attendees"}
                      </button>
                      {showAttendees && (
                        <div className="attendees">
                          {attendees.map((attendee) => (
                           <Attendee event = {event} attendee={attendee} updateEventAttendance = {updateEventAttendance} />
                          ))}
                        </div>
                      )}
                    </>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
