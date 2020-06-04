
export const sortByPosition = (elem: any, nextElem: any) => {

    if (elem.position < nextElem.position) {
      return -1;
    } else if (elem.position > nextElem.position) {
      return 1;
    }

    return 0;

}