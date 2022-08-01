const capitalize = (input: string) => {
    var words = input.split(' ');
    var CapitalizedWords: string[] = [];
    words.forEach(element => {
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    return CapitalizedWords.join(' ');
}
export { capitalize }
