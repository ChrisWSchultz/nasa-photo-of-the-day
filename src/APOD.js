import React, { useState, useEffect } from "react";
import axios from 'axios';

import { BASE_URL, KEY, DATE_QUERY } from "./config";

import PictureCard, { SideButton, ControlsContainer } from "./pictureCard";

const url = `${BASE_URL}${KEY}${DATE_QUERY}`;
const days = buildDates(6);

function buildDates(number) {
    const list = [];
    for(let i = 0; i < number; i++) {
        const picture = new Date();
        picture.setDate(picture.getDate() + (-i - 1));
        list.push(`${url}${picture.toISOString().slice(0,10)}`);
    }
    return list;
}



export function PictureOfTheDay() {

    const [next, setNext] = useState(days[0]);
    const [current, setCurrent] = useState(0);
    const [data, setData ] = useState(0);

    function handleClick(num) {
        setCurrent(current + num);
        setNext(days[current]);

        if(current === days.length) {
            setCurrent(0);
        } else if(current < days.length) {
            setCurrent(days.length - 1);
        }
    }

    useEffect(() => {
        axios
            .get(`${next}`)
            .then(response => {
                console.log(response);
                setData(response.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${next}`)
            .then(response => {
                console.log(response);
                setData(response.data);
            });
    }, [next]);

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
    <ControlsContainer>
        <SideButton onClick={()=>{console.log('click'); handleClick(-1);}}>
            Previous</SideButton>
        <PictureCard data={data} />
        <SideButton onClick={()=>{console.log('click'); handleClick(1)}}>
            Next</SideButton>
    </ControlsContainer>
    );
}