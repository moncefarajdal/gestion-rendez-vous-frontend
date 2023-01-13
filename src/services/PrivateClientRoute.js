import { Route, Redirect } from 'react-router-dom'

const PrivateClientRoute = ({ children, ...rest }) => {
    let token = localStorage.getItem('token')
    let role = localStorage.getItem('role').toLowerCase().substring(1, localStorage.getItem('role').toLowerCase().length-1);
    let auth = { 'token': true, 'role': role }
    if (token == null && role != 'client') {
        auth.token = false
    }
    console.log(role)
    return (
        <Route {...rest}>
            {!auth.token
                ?
                <Redirect to="/auth/login" />
                :
                children}
        </Route>
    )
}

export default PrivateClientRoute