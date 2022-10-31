import Image from 'next/image' 

import { Stack, Box, Typography , Link} from "@mui/material";

import styled from "@emotion/styled";

import { theme } from "../theme";

import { StyledLink } from '../component/Link';

// import fb from '../../images/facebook.svg'
// import ig from '../../images/instagram.svg'
// import pinterest from '../../images/pinterest.svg'
// import twitter from '../../images/twitter.svg'


const StyledStack = styled(Stack)(({ theme }) => ({
      padding: "4em 5vw",
      flexDirection: 'row',
      justifyContent:"space-between",
      backgroundColor:'rgb(35, 33, 39)',
      [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            gap:'3em'
            
      }

      
}))




const Footer = () => {

      return (

            <StyledStack>
                  <Box>
                        <Typography component={'h4'} variant='h4'>
                              Shortly
                        </Typography>
                  </Box>

                  <Stack gap='1em'>
                        <Typography component={'h4'} variant='h4'>Features</Typography>
                        <StyledLink>Link Shortening</StyledLink>
                        <StyledLink>Branded Links</StyledLink>
                        <StyledLink>Analytics</StyledLink>
                  </Stack>

                  <Stack gap='1em'>
                        <Typography component={'h4'} variant='h4'>Resources</Typography>
                        <StyledLink>Blog</StyledLink>
                        <StyledLink>Developers</StyledLink>
                        <StyledLink>Support</StyledLink>
                  </Stack>
                  
                  <Stack gap='1em'>
                        <Typography component={'h4'} variant='h4'>Company</Typography>
                        <StyledLink>About</StyledLink>
                        <StyledLink>Our Team</StyledLink>
                        <StyledLink>Careers</StyledLink>
                        <StyledLink>Contact</StyledLink>
                  </Stack>

                  {/* <Stack direction={'row'} gap='1em'>
                        <Image src={ fb}  width='24px'/>
                        <Image src={ twitter}   width='24px'/>
                        <Image src={pinterest }  width='24px'/>
                        <Image src={ig}   width='24px'/>

                  </Stack> */}

            </StyledStack>
            
      )
}

export default Footer;