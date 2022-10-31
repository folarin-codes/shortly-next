import Image from 'next/image'

import { Box, Stack, Typography } from '@mui/material'

import styled from '@emotion/styled'

import { theme } from '../theme'

import icon1 from '../images/icon1.svg'


import icon2 from '../images/icon2.svg'

import icon3 from '../images/icon3.svg'

const StyledStack = styled(Stack)(({theme}) => ({

      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: "2em",
      marginTop:'3em',
      [theme.breakpoints.down('md')]: {
            flexDirection:"column"
            
      }
  
}))

const StyledBox = styled(Box)(({ theme }) => ({
      backgroundColor: "white",
      borderRadius: '5px',
      padding: '3em 2em 2em',
      position: "relative",
      marginTop:'3em'
      
      
}))

const ImageContainer = styled(Box)(({ theme }) => ({
      height: '70px',
      width: '70px',
      backgroundColor: "hsl(257, 27%, 26%)",
      borderRadius: '50%',
      alignItems: "center",
      display: 'flex',
      alignSelf: 'center',
      justifyContent: 'center',
      position: "absolute",
      top:"-2em"

      
}))


const Main = () => {

      return (

            <Box sx={{backgroundColor:' hsl(0deg 0% 96%)', padding:"10em 5vw 4em"}}>
                  <Typography textAlign={'center'} variant='h2' component={'h2'}>Advanced Statistics</Typography>

                  <Typography  textAlign={'center'} variant='p' component={'p'}>Track how your links are performing across the web with our advanced statistics dashboard</Typography>

                  <StyledStack>
                        
                        <StyledBox>
                              <ImageContainer>
                                    
                              <Image src={icon1} width='40px' height='40px' alt=' a brand icon' />

                              </ImageContainer>
                              <Typography mb='.5em' component={'h3'} variant='h3'>Brand Recognition</Typography>
                              <Typography variant='p' component={'p'}>Boost your brand recognition with each click. Generic links dont mean a things. Branded links help instill confidence in your content</Typography>

                        </StyledBox>

                        <StyledBox>
                              <ImageContainer>
                                    
                              <Image src={icon2} alt="record icon" />

                              </ImageContainer>

                              <Typography  mb='.5em' component={'h3'} variant='h3'>Detailed Records</Typography>
                              <Typography variant='p' component={'p'}>Gain insights into who is clicking your links. Knowing when and where people engage with yoour content helps inform beter decisions</Typography>

                        </StyledBox>

                        <StyledBox>
                              <ImageContainer>
                                    
                              <Image src={icon3} width='40px' height={'40px'} alt='tool icon'/>

                              </ImageContainer>
                              <Typography  mb='.5em' component={'h3'} variant='h3'>Fully Customizable</Typography>
                              <Typography variant='p' component={'p'}>Imoprove brand awareness and content discoverability links, supercharging audience engagement.</Typography>

                        </StyledBox>

                  </StyledStack>

            </Box>
            
      )
}

export default Main;