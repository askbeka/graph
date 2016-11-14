import React, {Component} from 'react';
import {connect} from 'react-redux';
import Graph from '../../component/Graph';
import SearchPanel from '../../component/SearchPanel';
import Editor from '../../component/Editor';
import s from './App.less';
import {getData} from '../../service';
import {createAction} from 'redux-actions';
import 'whatwg-fetch';
class App extends Component {
    constuctor() {

    }

    componentDidMount(){
        // fetch('/data').then(res => res.json()).then(data => console.log(data)).catch(err =>console.log(err))
        getData().then(data => this.props.updateData(data.graph)).catch(err => console.error(err.stack || err))
    }
    render() {
        const {graph, env, select, search} = this.props;
        return (
            <div className={s.root}>
                <SearchPanel search={search}/>
                <div className={s.main}>
                    <Graph data={graph ? graph[env] : null}/>
                </div>
                <Editor item={select}/>
            </div>
        );
    }
};


const mapStateToProps = ({graph, env, select, search}) => ({graph, env, select, search});

const mapDispatchToProps = {
    updateData: createAction('UPDATE_GRAPH')
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
