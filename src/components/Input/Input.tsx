import React from "react";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";


export const Input = (props: {onChange: Function}) => {
    const subject = new Subject<string>();
    subject.pipe(debounceTime(500)).subscribe((value) => {props.onChange(value)});

    return (
        <input onChange={($event) => subject.next($event.target.value)} className={`icon`}>
        </input>
    )
}
