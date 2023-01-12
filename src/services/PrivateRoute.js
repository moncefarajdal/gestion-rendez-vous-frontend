import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
    let token = localStorage.getItem('token')
    let auth = { 'token': true }
    if (token == null) {
        auth.token = false
    }
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

export default PrivateRoute