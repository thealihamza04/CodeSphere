import React, { createContext, useContext, useReducer, useEffect } from "react";

const MyContext = createContext();

const initialState = {
    user: null,
    theme: "light",
    data: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_THEME":
            return { ...state, theme: action.payload };
        case "SET_DATA":
            return { ...state, data: action.payload };
        case "HYDRATE":
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

// Safe localStorage wrapper
const useStorage = (isServer, mockStorage) => {
    if (isServer) return mockStorage;
    if (typeof window !== "undefined") return window.localStorage;
    return {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
    };
};

export function MyContextProvider({
    children,
    initialData = {},
    isServer = false,
    storage = null,
}) {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        ...initialData,
    });

    const localStorage = useStorage(isServer, storage);

    // Hydrate from localStorage on client-side only
    useEffect(() => {
        if (!isServer && typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            const savedUser = localStorage.getItem("user");

            if (savedTheme) {
                dispatch({ type: "SET_THEME", payload: savedTheme });
            }
            if (savedUser) {
                try {
                    dispatch({
                        type: "SET_USER",
                        payload: JSON.parse(savedUser),
                    });
                } catch (e) {
                    console.error("Error parsing saved user:", e);
                }
            }
        }
    }, [isServer]);

    // Save to localStorage when state changes (client-side only)
    useEffect(() => {
        if (!isServer && typeof window !== "undefined") {
            localStorage.setItem("theme", state.theme);
            if (state.user) {
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        }
    }, [state.theme, state.user, isServer]);

    const value = {
        state,
        dispatch,
        isServer,
        // Helper functions
        setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
        setTheme: (theme) => dispatch({ type: "SET_THEME", payload: theme }),
        setData: (data) => dispatch({ type: "SET_DATA", payload: data }),
    };

    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within MyContextProvider");
    }
    return context;
};
