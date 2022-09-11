import {TYPE} from "../constants/type";

export const typeOfObject = (value) => {
  if (Object.prototype.toString.call(value) === '[object String]') {
    return TYPE.STRING
  }
  if (Object.prototype.toString.call(value) === '[object Array]') {
    return TYPE.ARRAY
  }
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return TYPE.DICT
  }
  return TYPE.OTHER
}

export const formatExpectationTargets = (res) => {
  let result = {};
  res.results.bindings.forEach(item => {
    const key = item.e.value.split("#")[1];
    const value = {
      t: item.t.value.split("#")[1],
      pp: item.pp.value.split("#")[1],
      oo: item.oo.value.split("#")[1],
      pp1: item.pp1 ? item.pp1.value : "",
      oo1: item.oo1 ? item.oo1.value : ""
    };
    if (result[key]) {
      result[key].push(value)
    } else {
      result[key] = [value]
    }
  })
  return result;
}

export const formatDetail = (res) => {
  let result = {};
  res.results.bindings.forEach(item => {
    const key = item.subject.value.split("#")[1];
    if (result[key]) {
      result[key].predicate.push(item.predicate.value.split("#")[1])
    } else {
      result[key] = {
        context: item.context.value,
        object: item.object.value.split("#")[1],
        predicate: [item.predicate.value.split("#")[1]]
      }
    }
  })
  return result;
}

export const formatExpectation = (res) => {
  let result = {};
  res.results.bindings.forEach(item => {
    const key = item.expectation.value.split("#")[1];
    if (result[key]) {
      result[key]["target"] = item.target.value.split("#")[1];
    } else {
      result[key] = {
        "target": item.target.value.split("#")[1],
        "params": {}
      };
    }

    const paramKey = item.oo.value.split("#")[1];
    // const param = JSON.stringify({
    //   "pp": formatValue(item.pp2 ? item.pp2.value : item.pp1.value),
    //   "oo": formatValue(item.oo2 ? item.oo2.value : item.oo1.value)
    // });
    const param = formatValue(item.pp2 ? item.pp2.value : item.pp1.value)+': '+ formatValue(item.oo2 ? item.oo2.value : item.oo1.value)
    if (result[key]["params"][paramKey]) {
      result[key]["params"][paramKey].push(param);
    } else {
      result[key]["params"][paramKey] = [param];
    }
  })
  return result;
}

export const formatReportExpectation = (res) => {
  let result = {};
  let result2 = {};
  res.results.bindings.forEach(item => {
    const key = item.i.value.split("#")[1];
    
    if (!result[key]) {
    result2 = {};
    result[key] = result2;//item.expectation.value.split("#")[1];
    }
    
    const key2 = item.expectation.value.split("#")[1];
    if (result2[key2]) {
      result2[key2]["target"] = item.target.value.split("#")[1];
    } else {
      result2[key2] = {
        "target": item.target.value.split("#")[1],
        "compliant": {},
        "degraded": {}
      };
    }

    const paramKey = item.rep.value.split("#")[1];
    const type = item.pred.value.split("#")[1];
    // const param = JSON.stringify({
    //   "pp": formatValue(item.pp2 ? item.pp2.value : item.pp1.value),
    //   "oo": formatValue(item.oo2 ? item.oo2.value : item.oo1.value)
    // });
    const param = formatValue(item.pp14 ? item.pp14.value : item.pp13.value)+': '+ formatValue(item.value3 ? item.value3.value : item.value2.value)
    if (result2[key2][type][paramKey]) {
      result2[key2][type][paramKey].push(param);
    } else {
      result2[key2][type][paramKey] = [param];
    }
  })
  return result;
}

export const formatTS = (res) => {
  let result = {};
  res.results.bindings.forEach(item => {
    result[0] = item.ts;//item.expectation.value.split("#")[1];
      })
  return result
}

const formatValue = (value) => {
  if (value) {
    const temp = value.split("#");
    if (temp.length > 1) {
      return temp[1];
    }
    return temp;
  }
  return value;
}
