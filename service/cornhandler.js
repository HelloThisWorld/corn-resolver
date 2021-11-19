function handleCorn(corn) {
    let _param = corn.split(" ");
    if (validCorn(_param)) {
        let response = "";
        resolveCorn(_param).forEach(function (element) {
            response = response + element + "\n";
        });
        return response;
    } else {
        return `Input param '${corn}' invalid`;
    }
}

function resolveCorn(cornParam) {
    let result = new Array();
    cornParam.forEach(function (element, index) {
        switch (index) {
            case 0:
                result.push(resolveCron(element, "minute", 0, 60));
                break;
            case 1:
                result.push(resolveCron(element, "hour", 0, 24));
                break;
            case 2:
                result.push(resolveCron(element, "day of month", 1, 32));
                break;
            case 3:
                result.push(resolveCron(element, "month", 1, 13));
                break;
            case 4:
                result.push(resolveCron(element, "day of week", 1, 8));
                break;
            case 5:
                result.push(`command: ${element}`);
                break;

            default:
                break;
        }
    });

    return result;
}

function resolveCron(element, title, min, max) {
    let result = `${title}: `;
    let errors = validElement(element, title, min, max);
    if (errors) {
        return errors;
    }

    if (element === "*") {
        result += genResult(min, max, 1);
    } else if (element.includes("/")) {
        let parts = element.split("/");
        result += genResult(parts[0] === "*" ? 0 : parts[0], max, parts[1]);
    } else if (element.includes("-")) {
        let parts = element.split("-");
        result += genResult(parts[0], parseInt(parts[1]) + 1, 1);
    } else if (element.includes(",")) {
        let parts = element.split(",");
        parts.forEach(function (part) {
            result = result + part + " ";
        })
    } else {
        result += element;
    }

    return result.trim();
}

function validElement(element, title, min, max) {
    let parts;
    if (element.includes("/")) {
        parts = element.split("/");
    } else if (element === "*") {
        return null;
    } else if (element.includes("*")) {
        parts = element.split("*");
    } else if (element.includes("-")) {
        parts = element.split("-");
    } else if (element.includes(",")) {
        parts = element.split(",");
        parts.forEach(function (part) {
            if (parseInt(part) >= max || part < min) {
                return `invalid ${title} '${part}'`;
            } else {
                return null;
            }
        })
    } else {
        parts = [0, element];
    }

    if (parseInt(parts[1]) >= max || parts[1] < min) {
        return `invalid ${title} '${parts[1]}'`;
    } else {
        return null;
    }
}

function genResult(start, max, span) {
    let result = "";
    for (let i = parseInt(start); i < parseInt(max); i += parseInt(span)) {
        result = result + i + " ";
    }

    return result.trim();
}

function validCorn(cornParams) {
    return typeof (cornParams) != 'array' && cornParams.length == 6
}

module.exports = handleCorn;