import { createTheme } from "@mui/material"

export const theme = createTheme({
      typography: {
            
      },
      palette: {
            primary: {
                  main : '#1B1C1E'
                 
            }
      },
      typography: {
            h1: {
                  fontSize: "60px",
                  fontWeight:'600',
                  color:" hsl(257, 27%, 26%)" 
            },
            h2: {
                  fontSize: '48px',
                  fontWeight: '700',
                  
                  color: ' hsl(257, 27%, 26%)',
                  
                  
            },
            p: {
                  fontSize: '20px',
                  fontSize: '200',
                  color:'rgb(59, 48, 84)'
            },
            h3: {
                  fontSize: '25px',
                  color: ' hsl(257, 27%, 26%)',
                  fontWeight:'700',
            },
            h4: {
                  fontSize: '22px',
                  fontWeight: '700',
                  color:'#BFBFBF'
                  
            }

      },
      breakpoints: {
            values: {
                  xs: 0,
                  sm: 600,
                  md: 1024,
                  lg: 1200,
                  xl: 1536,
            }
      }
      
})