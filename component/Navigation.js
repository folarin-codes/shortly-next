import {useState} from 'react'

import Image from 'next/image'

import { Stack, Link, Box} from "@mui/material";

import Divider from '@mui/material/Divider';

import { PrimaryButton } from "./Button";

import styled from "@emotion/styled";

import { StyledHeaderLink } from "./Link";

import { theme } from '../theme'

import logo from '../images/logo.svg'

import hamburger from '../images/menu-line.svg'


const MobileLink = styled(Link)({

      color: "white !important",
      fontSize: '18px', 
      fontWeight:'500'
       

})


const Navigation = () => {

      return (

            <Stack direction={'row'} padding='2em 5vw 3em' justifyContent={'space-between' }  alignItems='center' sx={{[theme.breakpoints.down('md')]: {display:'none'}}}>
                  <Stack direction={'row'} gap='3em'  alignItems='center'>
                        
                        <StyledHeaderLink underline="none" href="/" sx={{fontSize:'30px !important', fontWeight:'700 !important'}}>Shortly</StyledHeaderLink>
                        <StyledHeaderLink  underline="hover">Features</StyledHeaderLink>
                        <StyledHeaderLink  underline="hover">Pricing</StyledHeaderLink>
                        <StyledHeaderLink underline="hover">Resources</StyledHeaderLink>
                        

                  </Stack>

                  <Stack direction={'row'} alignItems='center' gap='3em'>
                        <StyledHeaderLink  underline="hover">Login</StyledHeaderLink>
                        <PrimaryButton>Sign Up</PrimaryButton>
                  </Stack>

            </Stack>
            
      )
}


export const MobileNavigation = () => {

      const [menuOpen, setMenuOpen] = useState(false)
      
      const onClickHandler = () => {
            setMenuOpen(!menuOpen)
           
      }
      
      return (

            <Box padding="2em 5vw 0" sx={{display :'none',
                  [theme.breakpoints.down('md')]: {
                  display:'block'
            }}}>
                  <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
                        
                        <Link>
                              <Image src={logo } />
                        </Link>

                        <Image src={ hamburger } onClick={onClickHandler} />

                  </Stack>

                  <Stack sx={{backgroundColor: 'hsl(257, 27%, 26%)', borderRadius: '10px', alignItems:'center',  display: menuOpen ? 'flex' : 'none', position:'absolute', width:'80vw', zIndex:1, margin:"1em auto 0", gap:"2em", paddingY:"2em"}}>
                        
                        <MobileLink>Features</MobileLink>
                        <MobileLink>Pricing</MobileLink>
                        <MobileLink>Resources</MobileLink>

                        <Divider sx={{color:'red'}}/>
                        
                        <MobileLink>Login</MobileLink>
                        <PrimaryButton>Sign Up</PrimaryButton>

                  </Stack>

            </Box>
      )
}

export default Navigation;