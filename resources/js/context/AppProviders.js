import React from 'react';
import {AuthProvider} from './AuthProvider';
import {FeedMixProvider} from './FeedMixProvider';
import { ThemeProvider } from 'styled-components'
import theme from '../config/theme'

function AppProviders({children}) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <FeedMixProvider>
          {children}
        </FeedMixProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
export default AppProviders