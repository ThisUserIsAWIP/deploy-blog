import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './navbar';
import Posts from './posts';
import Apost from './apost';
import Authors from './authors';
import Anauthor from './anauthor';
import Tags from './tags';
import Panel from './panel';
import Register from './Register';
import Login from './login';
import Atag from './atag';
import PrivateRoute from './components/privateRoute';
import Vip from './vip';	
import Contact from './contact';
import { Elements } from '@stripe/react-stripe-js';
const stripe = loadStripe('pk_test_51IgC6XEg97j36WdCpiPL7YPS5LXhyMEjFl7r3BjKTkcwLEoemUlZNsVDDVumyDm7481xlrpCYcHdav7s67AZsQYg00ifMOmmsH')
const App = (props: AppProps) => {
	

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path={'/posts'}>
					<Posts />
				</Route>
				<Route exact path={'/post/:id'}>
					<Apost />
				</Route>
				<Route exact path={'/authors'}>
					<Authors />
				</Route>
				<Route exact path={'/authors/:id'}>
					<Anauthor />
				</Route>
				<Route exact path={'/tags'}>
					<Tags />
				</Route>
				<Route exact path ={'/tags/:id'}>
					<Atag />
				</Route>
				<PrivateRoute exact path={'/panel'}>
					<Panel />
				</PrivateRoute>
				<Route exact path={'/register'}>
					<Register />
				</Route>
				<Route exact path={'/login'}>
					<Login />
				</Route>
				<Route exact path={'/contact'}>
					<Contact />
				</Route>
				<Elements stripe={stripe}>
					<Vip />
				</Elements>
			</Switch>
		</BrowserRouter>
	);
};

interface AppProps {}

export default App;
