import Image from 'next/image'

import { Stack, Box, Typography } from '@mui/material'

import styled from '@emotion/styled'

import { PrimaryButton } from '../component/Button'

import {theme} from '../theme'

import image from '../images/illustration-working.svg'

const StyledHeader = styled(Stack)(({ theme }) => ({

      flexDirection: "row",
      padding: '4em 5vw',
      overflow: 'hidden',

      [theme.breakpoints.down('md')]: {
            flexDirection: "column-reverse",
            gap:"2em"
            
      }

      
     
}))

console.log(Box)


const Header = () => {
      return (

            <header >
                  <StyledHeader>
                        
                        <Box>
                              <Typography variant='h1' component='h1' sx={{fontWeight:'700',[theme.breakpoints.down('md')]:{textAlign:"center", fontSize:"40px"}}}>More that just shorter links</Typography>

                              <Typography variant='p' mb='1em' component={'p'} sx={{[theme.breakpoints.down('md')]:{textAlign:"center"}}}>Build your brands recognition and get detailed insights on how your links are performing </Typography>

                              <PrimaryButton sx={{[theme.breakpoints.down('md')]:{margin:'auto', display:'flex', width:"50vw"}}}>Get Started</PrimaryButton>
                        </Box>

                        <Box sx={{position:"relative" , left:'6vw', [theme.breakpoints.down('md')]:{left:"20vw"}}}>
                              <Image src={image }/>

                        </Box>

                  </StyledHeader>
                  
                  

            </header>
            
      )
}

export default Header;