import React, { useEffect, useState, useLocalState } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import {
	showLoading,
	showAuthMessage,
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
import JwtAuthService from 'services/JwtAuthService'
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion"
import AuthService from 'services/AuthService';
import SuccursaleService from 'services/SuccursaleService';
import axios from 'axios';

export const LoginForm = (props) => {
	let history = useHistory();

	const {
		otherSignIn,
		showForgetPassword,
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		extra,
		loading,
		showMessage,
		message,
		authenticated,
		showAuthMessage,
		token,
		redirect,
		allowRedirect
	} = props

	const onLogin = values => {
		showLoading()
		const fakeToken = 'fakeToken'
		JwtAuthService.login(values).then(resp => {
			authenticated(fakeToken)
		}).then(e => {
			showAuthMessage(e)
		})
	};

	const onGoogleLogin = () => {
		showLoading()
	}

	const onFacebookLogin = () => {
		showLoading()
	}

	// Login service
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	function handleLogin() {
		AuthService.login(username, password).then(
			() => {
				history.push(`/app/home`)
			},
			error => {
				// const resMessage =
				// 	(error.response &&
				// 		error.response.data &&
				// 		error.response.data.message) ||
				// 	error.message ||
				// 	error.toString();
				// console.log(resMessage)
				console.log(error)
			}
		);
		SuccursaleService.getNomByChef(username).then(
			(response) => {
				localStorage.setItem('succursale', response.data)
				console.log(response.data)
			},
			error => console.log(error)
		)
	};

	console.log(username)

	const renderOtherSignIn = (
		<div>
			<Divider>
				<span className="text-muted font-size-base font-weight-normal">or connect with</span>
			</Divider>
			<div className="d-flex justify-content-center">
				<Button
					onClick={() => onGoogleLogin()}
					className="mr-2"
					disabled={loading}
					icon={<CustomIcon svg={GoogleSVG} />}
				>
					Google
				</Button>
				<Button
					onClick={() => onFacebookLogin()}
					icon={<CustomIcon svg={FacebookSVG} />}
					disabled={loading}
				>
					Facebook
				</Button>
			</div>
		</div>
	)

	return (
		<>
			<motion.div
				initial={{ opacity: 0, marginBottom: 0 }}
				animate={{
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0
				}}>
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form
				layout="vertical"
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							message: 'Please input your email',
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />} value={username} onChange={(e) => setUsername(e.target.value)} />
				</Form.Item>
				<Form.Item
					name="password"
					label={
						<div className={`${showForgetPassword ? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword &&
								<span
									onClick={() => onForgetPasswordClick}
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							}
						</div>
					}
					rules={[
						{
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input prefix={<LockOutlined className="text-primary" />} value={password} onChange={(e) => setPassword(e.target.value)} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading} onClick={() => handleLogin()}>
						Sign In
					</Button>
				</Form.Item>
				{
					otherSignIn ? renderOtherSignIn : null
				}
				{extra}
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({ auth }) => {
	const { loading, message, showMessage, token, redirect } = auth;
	return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
