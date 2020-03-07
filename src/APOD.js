import React, { useState, useEffect } from "react";
import axios from 'axios';

import { BASE_URL, DATE_QUERY } from "./config";

import PictureCard, { DatePicker, FullScreen, DateWrapper } from "./pictureCard";


export function PictureOfTheDay() {

    const [data, setData ] = useState(0);
    const [link, setLink] = useState(BASE_URL);

    function getDate(event) {
        const datepicker = document.querySelector('#date-picker');
        datepicker.setAttribute('value', `${event.target.value}`);
        setLink(`${DATE_QUERY}${event.target.value}`);
    }

    useEffect(() => {
        axios
            .get(`${link}`)
            .then(response => {
                setData(response.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${link}`)
            .then(response => {
                setData(response.data);
            });
    }, [link]);

    useEffect( () => {
        if (data && data.media_type === 'image') {
            document.body.style = `background: center / cover no-repeat url('${data.hdurl}')`;
        } else {
            document.body.style = 'background-color: black';
        }
    }, [data]);

    if(!data) {
        return (<p>Loading...</p>)
    }
    return (
    <FullScreen>
        <DateWrapper>
            <DatePicker onChange={(event) => {getDate(event)}}/>
        </DateWrapper>
        <PictureCard data={data} />
    </FullScreen>
    );
}