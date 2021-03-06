import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>QAMatch</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/surveys'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Surveys
                            </NavLink>
                        </li>
                        <Route path='/surveys/:sid/questions' render={(routeProps) =>
                            <li>
                                <NavLink to={routeProps.match.url} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list'></span> Survey {routeProps.match.params.sid} Questions
                                </NavLink>
                            </li>} />
                        <Route path='/surveys/:sid/answers' render={(routeProps) =>
                            <li>
                                <NavLink to={routeProps.match.url} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list'></span> Survey {routeProps.match.params.sid} Answers
                                </NavLink>
                            </li>} />
                    </ul>
                </div>
            </div>
        </div>;
    }
}
