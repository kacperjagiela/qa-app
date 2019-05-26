import styled, {keyframes} from "styled-components";
import { fadeInRight } from "react-animations";

// move generic styled components to /styles dir 

export const FadeRight = styled.div`
	width:60vw;
	height:70vh;
	border-radius:10px;
	text-align:center;
	animation: 1.5s ${keyframes `${fadeInRight}`};
`;

export const InputText = styled.input`
	width:15vw;
	border-radius:5px;
	border:none;
`;

export const Button = styled.input`
	background-color: #83c483;
	border:none;
	font-family: "Roboto", sans-serif;
	font-size:1.5vw;
	border-radius: 5px;
	cursor: pointer;
	padding:5px;
	color:rgb(234,236,237);
	margin-top:1vh;

	&:hover{
		letter-spacing: 1px;
		-webkit-box-shadow: 0px 5px 40px -10px;
		-moz-box-shadow: 0px 5px 40px -10px;
		box-shadow: 5px 40px -10px;
		transition: all 0.4s ease 0s;
	}
`;

export const ButtonInnactive = styled(Button)`
	background-color:grey;
`;