import React, {useContext} from 'react'

const themes = {
  light: {
    text: 'light',
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    text: 'dark',
    foreground: '#ffffff',
    background: '#222222',
  }
}

const ThemeContext = React.createContext(themes.light)

export function AppThemeColor () {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar></Toolbar>
    </ThemeContext.Provider>
  )
}

function Toolbar(props) {
  return (
    <div>
      <ThemeButton></ThemeButton>
    </div>
  )
}

function ThemeButton() {
  const theme = useContext(ThemeContext)
  return (
    <>
      <h3>内置hook useContext</h3>
      <button style={{background: theme.background, color: theme.foreground}}>
        I am styled by theme context -- theme: {theme.text}
      </button>
    </>
  )
}