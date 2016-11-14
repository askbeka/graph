import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const EnvSelector = ({envs}) => (
    <div>
        {envs.map(env => <Link to={`/${env}`}>{env}</Link>)}
    </div>
);

const mapStateToProps = (state) => ({
    envs: Object.keys(state.data)
});


