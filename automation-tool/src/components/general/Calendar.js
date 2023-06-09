import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timegridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnclickoutside';
import styles from "./Calendar.module.scss";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import useRequest from "../../hooks/useRequest";

//import './Calendar.style.css'
//import esLocale from '@fullcalendar/core/locales/es'

function Calendar({ list_changes, onSetdates }) {

    return (
        <>
            <FullCalendar
                eventContent={(eventInfo) => {
                    return <CustomEventContent eventInfo={eventInfo} />
                }}
                plugins={[dayGridPlugin, timegridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth" }}
                events={list_changes}
                datesSet={onSetdates}
            // events={[
            //     { id: 1245, title: "Change_1", date: "2023-03-06" },
            //     { id: 2345, title: "Change_2", start: "2023-03-04 17:00", end: "2023-03-05 19:00" },
            //     { id: 3456, title: "Change_3", start: "2023-03-04 17:00", end: "2023-03-04 19:00" }]}
            // eventClick={handlerClickEvent}
            //locale={esLocale}
            />
        </>
    );
}

function CustomEventContent({ eventInfo }) {
    // debugger
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const refModal = useRef(null);
    const { data: event, isLoading: isLoadingEvent, error: errorEvent, request: getEvent } = useRequest(null)

    const handlerOnclickoutside = () => {
        setActive(false);
    }

    useEffect(() => {
        // getChanges()
        if (active) {
            console.log(eventInfo)
            getEvent(`/change/${eventInfo.event.id}`, 'GET')
        }
    }, [active]);

    useOnClickOutside(refModal, handlerOnclickoutside);
    return (
        <>
            <div className={styles.customEventcontainer} onPointerEnter={() => {
                // console.log(eventInfo.event.title)
            }} >
                {/* <div className={`${styles.modalContainer} ${active ? styles.active : ''}`} ref={refModal}>
                    <h2>{eventInfo.event.title}</h2>
                    <h3>
                        <span>Assignment Group:</span> {eventInfo.event.extendedProps.assigment_group}
                    </h3>
                    <p>
                        <span>Description:</span> {eventInfo.event.extendedProps.description}
                    </p>
                    <Link to={`/event/${eventInfo.event.id}`}>View details</Link>
                </div> */}
                <Dialog fullScreen open={active} onClose={handlerOnclickoutside}>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handlerOnclickoutside}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Sound
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handlerOnclickoutside}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <span>Assignment Group:</span>
                    <span>Description:</span>
                    <Link to={`/event/${eventInfo.event.id}`}>View details</Link>
                </Dialog>

                <div className={styles.customEventname} onClick={() => {
                    setActive(true)
                }} >{eventInfo.event.title}</div>
            </div>

        </>
    );

}

export default Calendar;

