const capitalize = (input: string) => {
    if (input) {
        var words = input.split(' ');
        var CapitalizedWords: string[] = [];
        words.forEach(element => {
            CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
        });
        return CapitalizedWords.join(' ');
    }
    else
        return ""
}
export { capitalize }
