import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import RdvDispo from 'services/RdvDispo';

const Calendar = () => {

    let events = []
    let event = []
    let parsedEvents = []

    let fakeEvents = [
        {
            title: 'BCH237',
            start: '2023-01-13T10:30:00',
            end: '2023-01-13T11:30:00',
        },
        {
            title: 'BCH237',
            start: '2023-01-14T10:30:00',
            end: '2023-01-14T11:30:00',
        }
    ]

    const [rdvDispo, setRdvDispo] = useState([])

    // useEffect(() => {
    //     RdvDispo.getAll().then((response) => {
    //         setRdvDispo(response.data)
    //     }).catch(e => console.log(e))
    // })

    useEffect(() => {
        RdvDispo.getAll()
            .then((res) => res.json())
            .then((data) => {
                setRdvDispo(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    },[], addEvents());

    // useEffect(() => {
    //     addEvents()
    // })

    console.log(rdvDispo)

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    function addEvents() {
        rdvDispo.forEach(e => {
            event = {
                title: 'BCH237',
                start: JSON.stringify(e.start).substring(1, 11).concat('T', JSON.stringify(e.start).substring(12, 20)),
                end: JSON.stringify(e.end).substring(1, 11).concat('T', JSON.stringify(e.end).substring(12, 20))
            }
            events.push(event)
        })
        console.log(events)
    }

    return (
        <div>
            {/* <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={false}
                events={events}
                eventContent={renderEventContent}
            /> */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={events}
            />
        </div>
    )
}

export default Calendar