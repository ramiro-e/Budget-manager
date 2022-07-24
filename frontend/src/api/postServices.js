const URL = 'http://localhost:3001/api'

const postServices = {
    

    deleteTransaction: async (data) => {
        return getData('deleteTransaction', data)
    },
    registerUser: async (data) => {
        return getData('user/register', data)
    },
    loginUser: async (data) => {
        return getData('user/login', data)
    }
}

export default postServices;


async function getData(route, data){
    let headers = new Headers({
        'Content-Type': 'application/json'
    });
    if(localStorage.getItem('loginToken')){
        headers.append('authorization', `Bearer ${JSON.parse(localStorage.getItem('loginToken')).token}`);
    }
    const response = await fetch(`${URL}/${route}`, {
        method: "POST",
        headers: headers, 
        body: JSON.stringify(data)
    })
    const jsonData = await response.json();

    if(response.status !== 200) {
        return {
            error: true,
            message: jsonData.message
        }    
    }

    return jsonData;
}
