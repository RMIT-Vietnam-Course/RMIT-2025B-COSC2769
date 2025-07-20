import { createContext, useContext } from 'react';

const ColorContext = createContext();

function GrandChildComponent() {
    const { color, backgroundColor } = useContext(ColorContext);

    return (
        <p style={{ color, backgroundColor }}>
            GrandChildComponent (Inherited Both)
        </p>
    );
}

function ChildComponent() {
    const parentContext = useContext(ColorContext);

    // Override backgroundColor.
    const childContext = {
        ...parentContext,
        backgroundColor: 'lightyellow',
    };

    return (
        <ColorContext.Provider value={childContext}>
            <p style={{ color: childContext.color, backgroundColor: childContext.backgroundColor }}>
                ChildComponent (New Background Color)
            </p>

            <GrandChildComponent />
        </ColorContext.Provider>
    );
}

function ParentComponent() {
    const grandParentContext = useContext(ColorContext);

    // Override color.
    const parentContext = {
        ...grandParentContext,
        color: 'darkgreen',
    };

    return (
        <ColorContext.Provider value={parentContext}>
            <p style={{ color: parentContext.color, backgroundColor: parentContext.backgroundColor }}>
                ParentComponent (New Color)
            </p>

            <ChildComponent />
        </ColorContext.Provider>
    );
}

export default function GrandParentComponent() {
    const baseContext = {
        color: 'white',
        backgroundColor: 'darkblue',
    };

    return (
        <ColorContext.Provider value={baseContext}>
            <div>
                <div className='mb-3'>--- E2 ---</div>
                <p style={{ color: baseContext.color, backgroundColor: baseContext.backgroundColor }}>
                    GrandParentComponent (Original Values)
                </p>

                <ParentComponent />
            </div>
        </ColorContext.Provider>
    );
}
