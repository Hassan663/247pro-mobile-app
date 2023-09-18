export async function onReordered(fromIndex: number, toIndex: number, data: any, setData: any) {
    // Since we remove the element first, account for its index shift
    const finalIndex = fromIndex < toIndex ? toIndex : toIndex;
    const copy = [...data];		// Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);
    copy.splice(finalIndex, 0, removed[0]);	// Now insert at the new pos
    setData(copy);
}
export function keyExtractor(str: string) {
    return str;
}