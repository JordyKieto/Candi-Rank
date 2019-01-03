const Controller = {
    /** 
     *function getCandidates
     *calls get on candidates api route
     *member of Controller object
     *returns  {Promise}           - Promise of completion.
    */
    getCandidates:()=>{
    var promise = new Promise((resolve, reject)=>{
        fetch(`http://localhost:3030/candidates`).then((response)=>{
            response.json().then((allCandidates)=>{
                resolve(allCandidates)});
        });
    }); 
    return promise;
    },
    /** 
     *function updateCandidate
     *calls put on candidates api route
     *member of Controller object
     *params id {int} - id of object to edit / updated_candidate {obj} - the new candidate object
     *returns  {Promise}           - Promise of completion.
    */
    updateCandidate:(id, updated_candidate)=>{
        var promise = new Promise((resolve, reject)=>{
        fetch(`http://localhost:3030/candidates/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updated_candidate),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((response)=>{
                response.json().then((res)=>{
                    resolve(res)});
            });
        }); 
        return promise;
    }
}

module.exports = Controller;