import styled, { keyframes } from 'styled-components';
import { fadeInRight } from 'react-animations';

// move generic styled components to /styles dir

export const FadeInRight = styled.div`
width:100%;
heigth:100%;
border-radius:10px;
text-align:center;
padding-top:5vh;
paddint-bottom:5vh;
animation: 1.5s ${keyframes`${fadeInRight}`};
`;

export const LoginDiv = styled.div`
font-family: 'Roboto', sans-serif;
width:100vw;
height: 100vh;
background-color:transparent;
text-align:center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const Profilepic = styled.img`
width:150px;
height:150px;

@media screen and (max-width:700px){
width:100px;
height:100px;
}`;

export const Register = styled.div`
font-family: 'Roboto', sans-serif;
width:80vw;
height:100vh;
margin-left:10vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

@media screen and (max-width:768px){
padding-top:2vh;
width:100vw;
margin-left: 0;
}
`;

export const QuestionDiv = styled.div`
width:90%;
padding:10px;
margin-top:2vh;
min-height:3vh;
border: 1px solid red;
border-radius:5px;
overflow:auto;
`;

export const Questions = styled.div`
width:100%;
`;

export const Welcome = styled.div`
font-family: 'Roboto', sans-serif;
width:100vw;
height:100vh;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
