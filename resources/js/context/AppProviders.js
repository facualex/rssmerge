import React from 'react';
import {AuthProvider} from './AuthProvider';
import { ThemeProvider } from 'styled-components'
import theme from '../config/theme'


// TODO: Add Theme Provider
function AppProviders({children}) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AuthProvider>
  )
}
export default AppProviders