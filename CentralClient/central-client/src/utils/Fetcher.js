/**
 return:
{ 
    err			        boolean, if true is error and has message
    data, error 		output data
    status              http status code
}
 * 
 */
export async function fetchData(url, options) {
    let status, err = false
    if (url === undefined) return { err: true, message: 'url is not defined' }
    return fetch(url, options)
        .then(res => {
            status = res.status
            if(!res.ok) err = true
            return res
        })
        .then(res => res.json())
        .then(data => {
            if(err){
                return{err, data}
            }
            return {err, status, data}
        })
}