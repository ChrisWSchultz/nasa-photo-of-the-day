import React, { useState, useEffect } from "react";
import axios from 'axios';

import { BASE_URL, KEY, DATE_QUERY } from "./config";

import PictureCard from "./pictureCard";

export function PictureOfTheDay() {
    const [data, setData] = useState(0);

    const url = `${BASE_URL}${KEY}`;

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                console.log(response);
                setData(response.data);
            });
    }, []);

    useEffect( () => {
        console.log(data);
        if(data.media_type === 'image') {
            document.body.style = `background: center / cover no-repeat url('${data.hdurl}')`;
        } else {
            document.body.style = 'background-color: black';
        }
    }, [data]);

    if(!data) {
        return (<p>Loading...</p>)
    }
    return <PictureCard data={data} />
}