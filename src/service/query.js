import {queryIntent} from "./service";

// query intent names and layer
export const queryNamesAndLayer = () => {
  const sql = `
    SELECT ?intent ?type  WHERE {
    ?intent ?pred icm:Intent .
    ?intent cem:layer ?type
    } LIMIT 10`;
  return queryIntent(sql)
}

// query expectation from intent name
export const queryExpectation = (intentName) => {
  const sql = `
SELECT ?expectation ?target ?oo ?pp1 ?oo1 ?pp2 ?oo2 WHERE {
   ?i a icm:Intent ;
       icm:hasExpectation ?expectation .
    ?expectation icm:allOf ?p .
    ?p ?pp ?oo .
    ?expectation icm:target ?target .
    optional {?oo ?pp1 ?oo1}
    optional {?oo1 ?pp2 ?oo2}
    filter (?pp1 != rdf:type)
    filter (?i = ex:${intentName})
} LIMIT 100`;
  return queryIntent(sql)
}

// intent report and status from intent name
export const queryReportAndStatus = (intentName) => {
  const sql = `
  SELECT ?intent  ?report ?state ?number ?timestamp WHERE {
     ?report icm:reportsAbout ?intent .
     ?report icm:handlingState ?state .
	   ?report icm:reportTimestamp ?timestamp .
     ?report icm:reportNumber ?number
   filter (?intent = ex:${intentName})
  } 
  order by desc (?number)
  LIMIT 10`;
  return queryIntent(sql)
}

// query report expectation from intentreport
export const queryReportExpectation = (intentReportName) => {
  const sql = `
  SELECT distinct ?i ?expectation ?pred ?target ?p ?oo11 ?pp12 ?value1 ?pp13 ?value2 ?pp14 ?value3 ?ts ?n WHERE {
    ?i a icm:IntentReport ;
        icm:hasExpectationReport ?expectation .
     ?i icm:reportTimestamp ?ts .
     ?i icm:reportNumber ?n .
     ?expectation icm:target ?oo .
     ?oo ?pp1 ?target .
     ?expectation ?pred ?p .
     ?p icm:reportsAbout ?oo11 .
     ?p ?pp12 ?value1 .
     ?value1 ?pp13 ?value2 .    
     optional{?value2 ?pp14 ?value3} .
     filter (?pp12 != icm:reportsAbout)    
     filter (?pp12 != rdf:type)
     #filter (?target != icm:IndividualTarget)
     filter (?pp13 != rdf:type)
     filter (?pred = icm:degraded || ?pred = icm:compliant)
     filter (?i = ex:${intentReportName})
} order by (?expectation) LIMIT 100`;
  return queryIntent(sql)
}
// intent report details
export const queryReportDetails = (intentName) => {
  const sql = `
  SELECT ?intent ?timestamp ?state WHERE {
     ?intent ?pred icm:IntentReport .
     ?intent cem:layer ?o .
     ?intent icm:reportTimestamp ?oo .
     ?oo ?pp1 ?oo1 .   
     ?intent icm:handlingState ?state 
	 filter (?intent = ex:${intentName})
  }
  LIMIT 10`;
  return queryIntent(sql)
}
