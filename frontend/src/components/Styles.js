import styled, { keyframes } from 'styled-components';
import {
	fadeInRight, zoomIn, slideInDown, fadeIn,
} from 'react-animations';

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
animation: 1.2s ${keyframes`${zoomIn}`};
`;

export const Profilepic = styled.img`
width:150px;
height:150px;
border-radius:50%;

@media screen and (max-width:768px){
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
animation: 1.2s ${keyframes`${fadeIn}`};

@media screen and (max-width:768px){
	padding-top:2vh;
	width:100vw;
	margin-left: 0;
}
`;

export const ShortProfile = styled.div`
width:80%;
margin-left:10%;
`;

export const SearchDiv = styled.div`
width:80%;
margin-left:10%;
`;

export const QuestionDiv = styled.div`
width:100%;
padding:10px;
margin-top:2vh;
min-height:3vh;
border-bottom: 1px solid #1890ff;
overflow:auto;

@media screen and (max-width:768px){
	width:100%;
}
`;

export const Questions = styled.div`
width:100%;
margin-top:20px;
border-top: 1px solid #1890ff;
animation: 1.2s ${keyframes`${fadeIn}`};

@media screen and (max-width:768px){
	margin-top:80px;
}
`;

export const Welcome = styled.div`
font-family: 'Roboto', sans-serif;
width:100vw;
height:100vh;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
animation: 1.3s ${keyframes`${slideInDown}`};
`;
