export const mentionInputPostStyle  = {
    control: {
        backgroundColor: '#ffffff',
        fontSize: 14,
        fontWeight: 'normal',
    } as React.CSSProperties,

    '&multiLine': {
        control: {
            fontFamily: 'Arial',
            minHeight: 63,
        },
        highlighter: {
            padding: 9,
            border: '1px solid transparent',
        },
        input: {
            padding: 11,
            border: '1px solid silver',
            display : "hidden"
        } as React.CSSProperties,
    } as React.CSSProperties,

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
        },
        input: {
            padding: 1,
            border: '2px inset',
            display : "hidden"
        },
    } as React.CSSProperties,

    suggestions: {
        list: {
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 14,
        },
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#d4d2d2',
            },
        },
    } as React.CSSProperties,
} 

export const mentionInputCommentStyle = {
    control: {
        width: "100%",
        fontSize: 14,
        fontWeight: 'normal',
        minHeight : 50,
        maxHeight : "auto",
    } as React.CSSProperties,

    '&multiLine': {
        control: {
            fontFamily: 'Arial',
            minHeight: 'auto',
        },
        highlighter: {
            padding: 0,
            border: '1px solid transparent',
            minHeight : "50px",
            maxHeight : "auto"
        } as React.CSSProperties,
        input: {
            padding: 11,
            border: '1px solid silver',
            minHeight : "50px",
            maxHeight : "auto",
        }as React.CSSProperties,
    } as React.CSSProperties,

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
        },
        input: {
            padding: 1,
            border: '2px inset',
        },
    } as React.CSSProperties,

    suggestions: {
        list: {
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 14,
        },
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#9dc1fc',
            },
        },
    } as React.CSSProperties
}

export const mentionStyle : React.CSSProperties = {
    color : "#1ba1f5",
    backgroundColor: "#e3e5e8",
    padding: 1,
    // paddingBottom: 3
}