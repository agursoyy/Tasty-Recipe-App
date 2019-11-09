import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
    componentDidMount() {
      this.redirect();
    }
    redirect() {
        const {loggedIn} = this.props;
        if(!loggedIn) {
            this.props.history.push('/login');
        }
    }
    render() {
        return(
            <h1>LOGGED IN</h1>
        )
    }
}
function mapState(state) {
    const { loggedIn } = state.authentication;
    return {loggedIn};
}

export default connect(mapState, null)(Home);
