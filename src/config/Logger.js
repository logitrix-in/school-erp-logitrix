const Logger = (text, color) => {
    console.log('%c' + text,
        `color: ${color}; padding:1rem 2rem; font-weight: 700; background-color: white; margin: 5px; font-family: arial;`)
}

export { Logger }