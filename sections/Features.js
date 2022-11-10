import { useState, useRef , useEffect} from 'react'

import { Stack, Box, Typography, Modal, Button } from '@mui/material'
import styled from '@emotion/styled';

import bgm from '../images/bgsm.svg'

import bgd from '../images/bgsd.svg'

import { theme } from '../theme';

import { RegularButton } from '../component/Button'

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
            gap: "2em",
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

      '&::placeholder': {

            color: 'inherit'
            
      },
      
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



const Feature = () => {

      
      const [link, setLink] = useState('')
      const [shortenedLink, setShortenedLink] = useState('')
      const inputRef = useRef(null)
      const [emptyLink, setEmptyLink] = useState(false)
      const [copyButtonText, setCopyButtonText] = useState('Copy')
      const [deleteToggle, setDeleteToggle] = useState(false)
      const [errorMessage, setErrorMessage] = useState('There was something wrong with your network connection , kindly try again')
      const [modalOpen , setModalOpen] = useState(false)

      const [isError, setIsError] = useState(false)

      if (typeof window !== 'undefined') {         

            localStorageArray = JSON.parse(localStorage.getItem("links Array"))
      }

      useEffect(() => {
            localStorageArray = JSON.parse(localStorage.getItem("links Array"));
            
            if (localStorageArray) {
                  
            linksArr = localStorageArray;                  
            }

            })

      const shortenLink = async () => {
            let result;

            try {

                  let data = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);

                  result = await data.json()

                  let { short_link, full_short_link, short_link2, full_short_link2 } = result.result;

                  
                 let shortLink = short_link || full_short_link || short_link2 || full_short_link2
                  
                  return shortLink;
                  
            }

            catch (error) {

                  setIsError(true)
                  setModalOpen(true)

                  if (result) {

                        // console.log(result)
                        
                        
                        setErrorMessage(result.error || errorMessage)
                        
                  }

                  else {

                        setErrorMessage(errorMessage)
                  }
                  // console.log(error)
            }

      }

      const storeLinkToLocalStorage = async () => {
            
            let result = await shortenLink()
            

            if (result) {

                  setShortenedLink(result)

                  if (linksArr) {

                        console.log(linksArr)

                        let lastLinkObj = linksArr[linksArr.length - 1]

                        console.log(lastLinkObj)

                        if (lastLinkObj) {
                              
                              const { id } = lastLinkObj;
                              

                          console.log(lastLinkObj, id)

                         linksArr.push({ link, result , id:id + 1 }) 
                              
                        }

                        else {
                              

                        linksArr.push({ link, result , id:linksArr.length })
                              
                        }

                  }

                  else {

                        
                        
                  linksArr.push({ link, result , id:linksArr.length })
     
                  }
              
                  localStorage.setItem("links Array", JSON.stringify(linksArr))
                  

            }

      }

      const copyShortLinkToClipBoard = (event) => {

            let copiedLink = event.target.previousSibling.innerText;
                       
            navigator.clipboard.writeText(copiedLink)
  
            event.target.innerText = 'Copied!'
            event.target.style.backgroundColor = 'hsl(257, 27%, 26%)'

            setTimeout(() => {
                  
            event.target.innerText = 'Copy'
            event.target.style.backgroundColor = 'hsl(180, 66%, 49%)'

                  
            }, 5000)

            
      }

      const onDeleteHandler = (event) => {

            let linkIdString = event.target.parentNode.parentNode.id;

            let linkId = parseInt(linkIdString)  

            let localArray = JSON.parse(localStorage.getItem("links Array"))

            console.log(localArray)

            let newArray = localArray.filter((item) => { return item.id != linkId })

            console.log(newArray)
            
            localStorage.setItem("links Array", JSON.stringify(newArray))

            setDeleteToggle(!deleteToggle)
      }

      const onShortenLinkClickHandler =  () => {

            inputRef.current.value = ''

            if (link) {
                  setEmptyLink(false)
                  
                  shortenLink()

                  storeLinkToLocalStorage()

                  setLink('')   

            }
            else {
                  
                  setEmptyLink(true)

                  setTimeout(() => { setEmptyLink(false) }, 10000)

                  
            }
      }

      const handleModalClose = () => {
            setModalOpen(false)
      }

      return (
           
            <StyledBox>
                  
                  <StyledStack>
                        <StyledInput type={'text'} placeholder='Shorten a link address' onChange={(e) => { setLink(e.currentTarget.value.toLowerCase()); }} ref={inputRef}
                        style={{border:emptyLink ? '1px solid red' : 'none' , color:emptyLink ? 'red' : 'initial'}}

                        />

                        <Typography sx={{position:'absolute', top:"6em", color:'red', fontWeight:"100", fontStyle:'italic', display:emptyLink ? 'block' : 'none', [theme.breakpoints.down('md')]:{top:'4.5em'}}}>Please add a link</Typography>

                        <RegularButton onClick={onShortenLinkClickHandler}>Shorten it!</RegularButton>
                        
                  

                  </StyledStack>

                  <Box position={'relative'} top='5em'>      
                  {
                      localStorageArray  &&   localStorageArray.map(({link , result,id}) => {
                              return (
                                    <StyledLinkContainer key={id} id={id} >
                                          
                                          <Typography>
                                                { link }
                                          </Typography>

                                          <Stack sx={{ flexDirection: "row", gap: '1em', alignItems: "center", [theme.breakpoints.down('md')]: { flexDirection: 'column' } }}>
                                                
                                                <Typography color={'cyan'} fontWeight='bold'>{ result}</Typography>

                                                <RegularButton onClick={event => copyShortLinkToClipBoard(event)} sx={{backgroundColor: copyButtonText == 'Copied!'? 'hsl(257, 27%, 26%) !important' : 'inherit', [theme.breakpoints.down('md')]:{width:"100%"}}} >{copyButtonText}</RegularButton>
                                                
                                                
                                                <RegularButton sx={{backgroundColor:'tomato !important', [theme.breakpoints.down('md')]:{width:"100%"}}} onClick={onDeleteHandler}>Delete !</RegularButton>
                                          </Stack>

                                    </StyledLinkContainer>
                              )
                        })
                        }
                  </Box>
                  
                  <Modal open={modalOpen} onClose={handleModalClose}>
                        <Stack sx={{ width: '60vw', display: 'flex', margin: '35vh auto', backgroundColor: "white", borderRadius: '5px', height: "25vh", flexDirection: 'column', position: "relative"}}>
                              
                              <Box sx={{backgroundColor:"tomato", padding:'.5em 1em'}}>
                                    
                              <Typography sx={{color:'white'}}>Error!!!</Typography>

                              </Box>

                              <Box sx={{padding: "2em" }}>
                                    
                              <Typography sx={{color:"tomato"}}>{errorMessage}</Typography>

                              </Box>

                              <Button onClick={handleModalClose} variant='primary' sx={{
                                    backgroundColor: "hsl(257, 27%, 26%)", width: '5em', position: "absolute", right:'3em', bottom:'.5em' , color:'white'
                              }}>ok</Button>


                              
                              
                       </Stack>
                  </Modal>

                  </StyledBox>
            
      )
}


export default Feature ;