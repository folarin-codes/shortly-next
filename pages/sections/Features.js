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
      const [deleteToggle , setDeleteToggle] = useState(false)

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
                  alert(result.error)
                  console.log(error)
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

                        alert('I am evaluated')
                        
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

      const onClickHandler =  () => {

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

      return (
           
            <StyledBox>
                  
                  <StyledStack>
                        <StyledInput type={'text'} placeholder='Shorten a link address' onChange={(e) => { setLink(e.currentTarget.value); }} ref={inputRef}
                        style={{border:emptyLink ? '1px solid red' : 'none' , color:emptyLink ? 'red' : 'initial'}}

                        />

                        <Typography sx={{position:'absolute', top:"6em", color:'red', fontWeight:"100", fontStyle:'italic', display:emptyLink ? 'block' : 'none', [theme.breakpoints.down('md')]:{top:'4.5em'}}}>Please add a link</Typography>

                        <RegularButton onClick={onClickHandler}>Shorten it!</RegularButton>
                        
                  

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

                                                <RegularButton onClick={event => copyShortLinkToClipBoard(event)} sx={{backgroundColor: copyButtonText == 'Copied!'? 'hsl(257, 27%, 26%) !important' : 'inherit'}} >{copyButtonText}</RegularButton>
                                                
                                                
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