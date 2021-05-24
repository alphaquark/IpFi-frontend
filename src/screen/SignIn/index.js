import React from 'react';
import { useDispatch } from 'react-redux';
import { userFetch } from '../../modules';

const SignIn = (props) => {
    // const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(userFetch());
    }, [dispatch]);
    return <div>123</div>;
};

export { SignIn };
