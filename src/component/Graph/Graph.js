import React, {PropTypes as type, Component} from 'react'
import d3 from 'd3';

export default class Graph extends Component {
    static propTypes = {
        data: type.object
    };

    componentDidMount() {

    }

    render() {
        return (
            <svg ref={g => this.graph = g}>

            </svg>
        );
    }
}
