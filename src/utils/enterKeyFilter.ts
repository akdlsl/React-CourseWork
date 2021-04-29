
export const enterKeyFilter = (event: React.KeyboardEvent, handler: Function) => {
    if (event.keyCode === 13 && handler) {
        handler();
    }
}
