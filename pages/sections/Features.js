import { useState, useRef , useEffect} from 'react'

import { Stack, Box, Typography } from '@mui/material'
import styled from '@emotion/styled';

import bgm from '../../images/bgsm.svg'

import bgd from '../../images/bgsd.svg'

import { theme } from '../../theme';

import { RegularButton } from '../../component/Button';

const StyledStack = styled(Stack)(({ theme }) => ({
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundImage: `url(${bgd.src})`,
      padding:"2em 3em",
      backgroundColor: "hsl(257, 27%, 26%)",
      borderRadius: '10px',
      position: 'relative',
      top: "3em",
      gap:"1em",
      
      [theme.breakpoints.down('md')]:{
            flexDirection: 'column',
            gap: "1em",
            backgroundImage: `url(${bgm.src})`,
            top:"5em"
      }

}))

const StyledBox = styled(Box)(({ theme }) => ({
      
      margin: '0em 5vw',  
      [theme.breakpoints.down('md')]: {  
            
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

const StyledLinkContainer = styled(Stack)(({ theme }) => ({
      flexDirection: 'row',
      justifyContent: "space-between",
      marginBottom: "1em",
      backgroundColor: "white",
      padding: "1em 1em",
      alignItems: "center",
      borderRadius: "10px",
      // position:"relative",
      [theme.breakpoints.down('md')]: {
            flexDirection:'column'
      }
      
}))

const linksArr = [];
let localStorageArray = [];
let toggle = false


const Feature = () => {

      
      const [link, setLink] = useState('')
      const [shortenedLink, setShortenedLink] = useState('')
      const [id , setId] = useState(0)
      const inputRef = useRef(null)
      const linkContainerRef = useRef('');
      const textRef = useRef('')




      if (typeof window !== 'undefined') {         


            localStorageArray = JSON.parse(localStorage.getItem("links Array"))
      }



      useEffect(() => {
            localStorageArray = JSON.parse(localStorage.getItem("links Array"));
            
            if (localStorageArray) {
                  
            linksArr = localStorageArray;
                  
            }

             }, [toggle, linksArr])

      const shortenLink = async () => {

            try {
                  let data = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);

                  let result = await data.json()

                  console.log(result)
               
      
                  let { short_link, full_short_link, short_link2, full_short_link2 } = result.result;

                  
                 let shortLink = short_link || full_short_link || short_link2 || full_short_link2
                  
                  return shortLink;
                  
            }

            catch (error) {
                  alert(error)
            }

      }

  

      const storeLinkToLocalStorage = async () => {
            
            let result = await shortenLink()
            
            // console.log(result)

            if (result) {

                  setShortenedLink(result)
                  setId(id + 1)

                  linksArr.push({ link, result , id})
              
                  localStorage.setItem("links Array", JSON.stringify(linksArr))
                  

            }

      }

      const copyShortLinkToClipBoard = () => {

            
            console.log(textRef.current.innerText);  
      }


      const onDeleteHandler = () => {

            let index = linkContainerRef.current;

            console.log(index)

            // linksArr.splice(index, 1);
            
            // localStorage.setItem("links Array", JSON.stringify(linksArr));



            
      }


      const onClickHandler =  () => {

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

                  <Box position={'relative'} top='5em'>      
                  {
                      localStorageArray  &&   localStorageArray.map(({link , result,id}) => {
                              return (
                                    <StyledLinkContainer key={id} ref={linkContainerRef}>
                                          
                                          <Typography>
                                                { link }
                                          </Typography>

                                          <Stack sx={{ flexDirection: "row", gap: '1em', alignItems: "center", [theme.breakpoints.down('md')]: { flexDirection: 'column' } }}>
                                                
                                                <Typography ref={textRef}   color={'cyan'} fontWeight='bold'>{ result}</Typography>

                                                <RegularButton onClick={copyShortLinkToClipBoard}>Copy</RegularButton>
                                                
                                                
                                                <RegularButton sx={{backgroundColor:'tomato !important'}} onClick={onDeleteHandler}>Delete !</RegularButton>
                                          </Stack>

                                    </StyledLinkContainer>
                              )
                        })
                        }
                        </Box>

                  </StyledBox>
            
      )
}


export default Feature ;