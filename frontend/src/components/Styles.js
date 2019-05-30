import styled, {keyframes} from "styled-components";
import { fadeInRight } from "react-animations";

// move generic styled components to /styles dir 

export const FadeInRight = styled.div`
	width:100%;
	heigth:100%;
	border-radius:10px;
	text-align:center;
	padding-top:5vh;
	paddint-bottom:5vh;
	animation: 1.5s ${keyframes `${fadeInRight}`};
`;
