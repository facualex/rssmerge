const palette = {
        white: "#fff",
        black: "#000",
        blue: '#07c',
        blues: [
          '#004170',
          '#006fbe',
          '#2d8fd5',
          '#5aa7de',
        ]
}
const theme = {
    colors: {
        white: palette.white,
        black: palette.black,
        blue: palette.blue,
        blues: palette.blues, 
    },
    fonts: ['Roboto'],

              // 0  1   2   3   4   5
    fontSizes: [12, 14, 16, 20, 24, 32],

    fontWeights: [],
    shadows: {},

         // 0  1  2  3   4
    space: [0, 4, 8, 16, 32],
    
    // variants
    buttons: {
        primary: {
          color: palette.white,
          backgroundColor: palette.blue,
        },
        secondary: {
          color: palette.white,
          backgroundColor: palette.blues[0],
        },
    }
}

// aliases
theme.fontSizes.header = theme.fontSizes[5]
theme.space.small = theme.space[1]
theme.space.medium = theme.space[2]
theme.space.large = theme.space[3]

export default theme;