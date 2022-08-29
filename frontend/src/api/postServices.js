const URL = 'http://localhost:3001/api'

const postServices = {
    
    getUserAccounts: async () => {
        return getData('getUserAccounts')
    },
    getCategories: async () => {
        return getData('getCategories')
    },
    getMethods: async () => {
        return getData('getMethods')
    },
    getUserAccountData: async (data) => {
        return getData('getUserAccountData', data)
    },
    getAccountData: async (data) => {
        return getData('getAccountData', data)
    },
    getUserAccountsData: async (data) => {
        return getData('getUserAccountsData', data)
    },
    getAccountAllTransactions: async (data) => {
        return getData('getAccountAllTransactions', data)
    },
    getUserLastTransactions: async () => {
        return getData('getUserLastTransactions')
    },
    getTransactionById: async () => {
        return getData('getTransactionById')
    },
    newAccount: async (data) =>{
        return getData('newAccount', data)
    },
    newTransaction: async (data) => {
        return getData('newTransaction', data)
    },
    editTransaction: async (data) => {
        return getData('editTransaction', data)
    },
    deleteTransaction: async (data) => {
        return getData('deleteTransaction', data)
    },
    checkEmail: async (data) => {
        return getData('user/checkEmail', data)
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
