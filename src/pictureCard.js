import React, { useState } from "react";
import styled from "styled-components";

const today = new Date();

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`
const CardTitle = styled.h1`
    font-family: 'Abel', sans-serif;
    font-size: 2.6rem;
    margin-top: 0;
    margin-bottom: 20px;
`
const InfoContainer = styled.div`
    background-color: ${(props) => props.showCard ? 'white' : 'none'};
    border-radius: 20px 20px 0 0 ;
    padding: 20px 50px 0;
    width: 800px;
    color: ${(props) => props.showCard ? 'black' : 'white'};
`
const Paragraph = styled.div`
    font-family: 'Raleway', sans-serif;
    font-size: 1.2rem;
    line-height: 1.4;
    padding-bottom: 20px;
    display: ${(props) => props.showCard ? 'border-box': 'none'};
`
const Video = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`
export const FullScreen = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100vh;
`
export const DatePicker = styled.input.attrs({
    type: 'date',
    id: 'date-picker',
    min: '2015-01-01',
    max: `${today.toISOString().slice(0, 10)}`
})`
    font-family: 'Abel', sans-serif;
    font-size: 1.4rem;
    color: white;
    border: none;
    background-color: transparent;
`


function PictureCard(props) {
    const [showCard, setShowCard] = useState(false);

    if(props.data.media_type === 'image') {
        return (
            <CardContainer>
                <InfoContainer showCard={showCard} onClick={() => {setShowCard(!showCard)}}>
                    <CardTitle>{ props.data.title }</CardTitle>
                    <Paragraph showCard={showCard}>
                        { props.data.explanation }
                    </Paragraph>
                    { props.data.copyright ? <p>{props.data.copyright}</p> : '' }
                </InfoContainer>
            </CardContainer>
        );
    } else if (props.data.media_type === 'video') {
        return (
            <Video>
                <iframe id="ytplayer" width="800" height="600"
                        src={ props.data.url }
                        frameBorder="0">
                </iframe>
            </Video>
        )
    }
}

export default PictureCard;