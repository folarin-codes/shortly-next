import { Button } from "@mui/material"
import styled from "@emotion/styled"

export const PrimaryButton = styled(Button)(({ theme }) => ({
      textTransform: 'none',
      borderRadius: "4em",
      backgroundColor: " hsl(180, 66%, 49%)",
      color: 'white',
      padding: ".5em 1.5em",
      
      '&:hover': {
            
            backgroundColor: "hsla(180, 66%, 49%,60%)",
      
                  
      }
      
}))

export const RegularButton = styled(Button)({
      textTransform: 'none',
      borderRadius: "5px",
      backgroundColor: " hsl(180, 66%, 49%)",
      color: 'white',
      padding:'.5em 2em',
      
      '&:hover': {
            
      backgroundColor: "hsl(180, 66%, 49%)",

            
      }


})
