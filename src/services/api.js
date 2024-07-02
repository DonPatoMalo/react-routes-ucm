

export async function login({ username, password }) {
    try{
        console.log({
            username: username,
            password: password,
        })
        const requestOptions = {
            method: 'POST',
            headers:
                {
                    'Content-Type': 'application/json'

                },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                })
        };
        const response = await fetch('http://localhost:8080/api/auth/login', requestOptions)
            .then(response => response.json())

        if (response.token) {
            return response.token
        }


    }catch(error){
        console.log(error);
    }
}

