export const search = (e: string, state: any, setState: any, orignalArr: any) => {
    let keywords = e.split(' ');
    if (keywords[0] === '') {
        setState(orignalArr);
    }
    if (keywords[0] !== '') {
        let searchPattern = new RegExp(
            keywords.map((term: any) => `(?=.*${term})`).join(''),
            'i'
        );
        let filterChat: any = [];
        for (let index = 0; index < orignalArr?.length; index++) {
            filterChat = orignalArr?.filter((data: any) => {
                return data.match(searchPattern);
            });
        }
        setState(filterChat);
    }
};