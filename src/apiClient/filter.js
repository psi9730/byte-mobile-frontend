// import Dynasty from 'dynasty'

// function compose_startkey(ids, id, lastStartKey) {

// }

export function isDateString(value) {
    // return true if date string
    var isoTime = Date.parse(value);
    if (!isoTime) {
        return false;
    } else {
        return true;
    }
}

export function serialize_value(value) {
    if (isDateString(value)) {
        return { N: Date.parse(value) };
    }
    if (typeof value === "string") {
        return { S: value };
    }
    if (typeof value === "number") {
        return { N: value };
    }
    if (typeof value === "boolean") {
        return { BOOL: value };
    }
}

export function translate_value(value) {
    var isoTime = Date.parse(value);
    if (isoTime) {
        isoTime = Math.round(isoTime / 1000);
        return isoTime;
    } else {
        return value;
    }
}

export function parse_expression(key, tempVar, operator) {
    var expression;

    if (operator === "contains") {
        expression = `contains (${key}, ${tempVar})`;
    } else if (operator === "eq") {
        expression = key + " = " + tempVar;
    } else if (operator === "gte") {
        expression = key + " >= " + tempVar;
    } else if (operator === "lte") {
        expression = key + " <= " + tempVar;
    } else if (operator === "gt") {
        expression = key + " > " + tempVar;
    } else if (operator === "lt") {
        expression = key + " < " + tempVar;
    } else {
        expression = key + " " + operator + " " + tempVar;
    }
    return expression;
}

export function parse_filter_key(filter_key) {
    var vals = filter_key.split("-");
    var operator = vals[vals.length - 1];
    // var colkey = vals[0]
    var colkey = vals.slice(0, vals.length - 1).join("-");

    return { colkey, operator };
}

export function parse_filter(filter) {
    var setFilter = false;
    var attributeValues = {};
    var filterEqExpressionList = [];

    for (var k in filter) {
        var { colkey, operator } = parse_filter_key(k);

        var tempVar = ":" + colkey;
        var rawVal = filter[k];
        attributeValues[tempVar] = translate_value(rawVal); //rawVal //translate_value(rawVal);

        var exp = parse_expression(colkey, tempVar, operator);
        filterEqExpressionList.push(exp);

        setFilter = true;
    }

    var params = {};
    if (setFilter) {
        var filterExpression = filterEqExpressionList.join(" AND ");
        params = {
            ExpressionAttributeValues: attributeValues,
            FilterExpression: filterExpression,
        };
    }

    return params;
}
