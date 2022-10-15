import { useState, useRef } from 'react'

import { Stack, Box } from '@mui/material'
import styled from '@emotion/styled';

import bgm from '../../images/bgsm.svg'

import bgd from '../../images/bgsd.svg'

import { theme } from '../../theme';

import { RegularButton } from '../../component/Button';

const StyledStack = styled(Stack)(({ theme }) => ({
      flexDirection: "row",
      justifyContent:"space-between",
      
      [theme.breakpoints.down('md')]:{
            flexDirection: 'column',
            gap:"1em"
      }
      

}))

const StyledBox = styled(Box)(({ theme }) => ({
      backgroundImage: `url(${bgd.src})`,
      margin: '0em 5vw',
      padding:"2em 3em",
      backgroundColor: "hsl(257, 27%, 26%)",
      borderRadius: '10px',
      position: 'relative',
      top:"3em",
      
      [theme.breakpoints.down('md')]: {
            backgroundImage: `url(${bgm.src})`,
            top:"5em"
      
      }

      
}))

const StyledInput = styled('input')(({ theme }) => ({
      border: "none",
      outline: "transparent",
      backgroundColor: 'white',
      width: "70vw",
      paddingLeft: "1em",
      borderRadius: "5px",
      
      [theme.breakpoints.down('md')]: {
            height: "3em",
            width:"100%"
      }

}))

const linksArr = [];

const Feature = () => {

      const [link, setLink] = useState('')
      const [shortenedLink, setShortenedLink] = useState('')

      const inputRef = useRef(null)
    
      
  

      // console.log(link)

      const shortenLink = async () => {
            
            let data = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);

            let result = await data.json()
         

            let { short_link, full_short_link, short_link2, full_short_link2 } = result.result;

            setShortenedLink(short_link || full_short_link || short_link2 || full_short_link2)
            
            console.log(shortenedLink)
                 
            


      }

      const storeLinkToLocalStorage = () => {
           

            if (shortenedLink) {
                  
                  console.log(linksArr)
                  linksArr.push(shortenedLink)
                  
                  localStorage.setItem("links Array" , JSON.stringify(linksArr))


            }


            
      }

      const onClickHandler = () => {

            inputRef.current.value = ''

            shortenLink()
            storeLinkToLocalStorage()
            
      }



      return (
            <StyledBox>
                  
                  <StyledStack>
                        <StyledInput type={'text'} placeholder='Shorten a link address' onChange={(e) => { setLink(e.currentTarget.value); }} ref={inputRef}  />

                        <RegularButton onClick={onClickHandler}>Shorten it!</RegularButton>
                        
                  

                  </StyledStack>

            </StyledBox>


            
      )
}


export default Feature ;