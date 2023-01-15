import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const Calendar = () => {

    const [rdvDispo, setRdvDispo] = useState([])

    useEffect(() => {
        const fetchRdvs = async () => {
            const response = await fetch(`http://localhost:8090/api/v1/rendez_vous/technicien/${localStorage.getItem('role')}`);
            const data = await response.json();
            setRdvDispo(data)
            console.log(data);
        };
        fetchRdvs();
    },[])

    console.log(rdvDispo)

    return (
        <div>
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
                events={rdvDispo}
            />
        </div>
    )
}

export default Calendar