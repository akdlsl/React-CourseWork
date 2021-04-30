import React from 'react'

const Icon = (props: {name: string}) => (
    <svg aria-hidden={true} className={`icon`}>
        <use xlinkHref={`./sprite.svg#${props.name}`} />
    </svg>
)

export default Icon;
