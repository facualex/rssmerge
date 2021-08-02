const palette = {
        white: "#fff",
        black: "#000",
        grey: '#585858',
        darkGrey: "#4D4D4D",
        darkerGrey: "#3F3B3B",
        primary: "#4DCDB6",
}
const theme = {
    colors: {
        white: palette.white,
        black: palette.black,
        primary: palette.primary,
        grey: palette.grey,
        darkGrey: palette.darkGrey,
        darkerGrey: palette.darkerGrey,
    },
    fonts: ['Roboto'],

              // 0  1   2   3   4   5
    fontSizes: [12, 14, 16, 20, 24, 32],

    fontWeights: [],
    shadows: {},

         // 0  1  2  3   4   5   6   7   8
    space: [0, 4, 8, 16, 32, 48, 52, 68, 80],
    
    // variants
    buttons: {
        primary: {
          color: palette.white,
          backgroundColor: palette.primary,
        },
        secondary: {
          color: palette.white,
          backgroundColor: palette.primary, 
        },
    }
}

// aliases
theme.fontSizes.header = theme.fontSizes[5]
theme.space.small = theme.space[1]
theme.space.medium = theme.space[2]
theme.space.large = theme.space[3]

export default theme;