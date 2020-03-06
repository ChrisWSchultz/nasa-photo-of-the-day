import React, { useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100vh;
`
const CardTitle = styled.h1`
    margin-top: 0;
    margin-bottom: 40px;
`
const InfoContainer = styled.div`
    background-color: ${(props) => props.showCard ? 'white' : 'none'};
    border-radius: 20px 20px 0 0 ;
    padding: 20px 50px 0;
    width: 600px;
    color: ${(props) => props.showCard ? 'black' : 'white'};
`
const Paragraph = styled.div`
    padding-bottom: 20px;
    display: ${(props) => props.showCard ? 'border-box': 'none'};
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
                </InfoContainer>
            </CardContainer>
        );
    } else if (props.data.media_type === 'video') {
        return (
            <iframe id="ytplayer" width="800" height="600"
                    src={ props.data.url }
                    frameBorder="0">
            </iframe>
        )
    }
}

export default PictureCard;