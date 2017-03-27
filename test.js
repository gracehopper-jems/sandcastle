const actionput = {type: "POST_TO_DB", put: "{"id":1,"name":"new name","lat":"50","lng":"50","c…:35.561Z","updatedAt":"2017-03-27T13:14:59.916Z"}"};
const db = [{"id":1,"name":"GHA","lat":"50","lng":"50","updatedAt":"2017-03-27T13:14:35.561Z","createdAt":"2017-03-27T13:14:35.561Z"}]
const duplicateInstance = _.find(db, {'id': actionput.id});
