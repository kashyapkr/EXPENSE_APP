import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Window} from '../../Utils/Window'

const Orb = () => {

const{width,height} = Window()
console.log(width,height);

    const moverOrb = keyframes`
        0%{
            transform: translate(0,0);
        }
        50%{
            transform: translate(${width/1.2}px,${height/1.7}px);
        }
        100%{
            transform: translate(0,0);
        }
    `

    const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-top: -37vh;
    margin-left: -37vh;
    background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
    /* background: linear-gradient(180deg, #f0e905 10%, #f9760b 100%); */
    filter: blur(300px);
    animation: ${moverOrb} 7s alternate linear infinite;

        
    `

  return (
    <OrbStyled>

    </OrbStyled>
  )
}

export default Orb