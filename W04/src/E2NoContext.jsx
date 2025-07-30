function GrandChildComponent({ color, backgroundColor }) {
    return (
        <p style={{ color, backgroundColor }}>
            GrandChildComponent (Inherited Both)
        </p>
    );
}

function ChildComponent({ color, backgroundColor }) {
    const newBackground = 'lightyellow';

    return (
        <div>
            <p style={{ color, backgroundColor: newBackground }}>
                ChildComponent (New Background Color)
            </p>

            <GrandChildComponent color={color} backgroundColor={newBackground} />
        </div>
    );
}

function ParentComponent({ color, backgroundColor }) {
    const newColor = 'darkgreen';

    return (
        <div>
            <p style={{ color: newColor, backgroundColor }}>
                ParentComponent (New Color)
            </p>

            <ChildComponent color={newColor} backgroundColor={backgroundColor} />
        </div>
    );
}

export default function GrandParentComponent() {
    const baseColor = 'white';
    const baseBackground = 'darkblue';

    return (
        <div>
            <div className='mb-3'>--- E2 No Context ---</div>

            <p style={{ color: baseColor, backgroundColor: baseBackground }}>
                GrandParentComponent (Original Values)
            </p>

            <ParentComponent color={baseColor} backgroundColor={baseBackground} />
        </div>
    );
}