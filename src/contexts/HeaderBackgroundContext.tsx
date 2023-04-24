import React, { useMemo, useContext, createContext } from 'react'

type Props = {
    children: React.ReactNode
}

interface BackgroundColor {
    colorOne: string | '#000000';
    colorTwo: string | '#000000';
}

interface ContextProps {
    backgroundColor: BackgroundColor;
    setBackgroundColor: (colors: BackgroundColor) => void;

}
const HeaderBackgroundContext = createContext<ContextProps>(
    {} as ContextProps
)

export const HeaderBackgroundProvider: React.FC<Props> = ({ children }) => {

    const [backgroundColor, setBackgroundColor] = React.useState<BackgroundColor>({
        colorOne: '#000000',
        colorTwo: '#ffffff',
    })

    return (
        <HeaderBackgroundContext.Provider
            value={{
                backgroundColor,
                setBackgroundColor
            }}
        >
            {children}
        </HeaderBackgroundContext.Provider>
    )
}

export const useHeaderBackground = () => {
    return useContext(HeaderBackgroundContext)
}