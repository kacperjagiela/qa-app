import styled, {keyframes} from "styled-components";
import fadeInRight from "react-animations";

export const Step = styled.div`
	width:60vw;
	height:70vh;
	margin-right:120vw;
	border-radius:10px;
	text-align:center;
	animation: 1.5s ${keyframes `${fadeInRight}`};
`;