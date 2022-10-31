
import { Box, Typography } from '@mui/material'

import { PrimaryButton } from '../../component/Button'

import styled from '@emotion/styled'

import { theme } from '../theme' 

import bgDesktop from '../images/bgd.svg'

import bgMobile from '../images/bgm.svg'


const StyledBox = styled(Box)(({ theme }) => ({

      backgroundImage: `url(${bgDesktop.src})`,
      backgroundColor: 'hsl(257, 27%, 26%)',
      padding:"4em 5vw",

      [theme.breakpoints.down('md')]: {
            
      backgroundImage: `url(${bgMobile}.src)`,
            
      }

   
}))



const CTA = () => {
      
      return (

            <StyledBox>
                  
                  <Typography textAlign={'center'} mb='1em' variant='h3' component="h3" color="white">Boost your links today</Typography>
                  <PrimaryButton sx={{display:"flex", margin:'auto'}}>Get Started</PrimaryButton>

            </StyledBox>
            
      )
      
}

export default CTA;