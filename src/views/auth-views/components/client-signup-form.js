import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert } from "antd";
import { showAuthMessage, showLoading, hideAuthMessage, authenticated } from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import JwtAuthService from 'services/JwtAuthService'
import AuthService from 'services/AuthService';
import { AUTH_PREFIX_PATH } from 'configs/AppConfig';

const rules = {
	email: [
		{
			required: true,
			message: 'Please input your email address'
		},
		{
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	password: [
		{
			required: true,
			message: 'Please input your password'
		}
	],
	confirm: [
		{
			required: true,
			message: 'Please confirm your password!'
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Passwords do not match!');
			},
		})
	]
}

export const ClientRegisterForm = (props) => {

	const { showLoading, token, loading, redirect, message, showMessage, hideAuthMessage, authenticated, allowRedirect } = props
	const [form] = Form.useForm();
	let history = useHistory();

	const onSignUp = () => {
		form.validateFields().then(values => {
			showLoading()
			const fakeToken = 'fakeToken'
			JwtAuthService.signUp(values).then(resp => {
				authenticated(fakeToken)
			}).then(e => {
				showAuthMessage(e)
			})
		}).catch(info => {
			console.log('Validate Failed:', info);
		});
	}

	// Login service
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [cin, setCin] = useState("")
	const [password, setPassword] = useState("")
	const [nom, setNom] = useState("")
	const [prenom, setPrenom] = useState("")

	function handleRegister() {
		AuthService.registerClient(username, email, password, cin, nom, prenom)
			.then(response => {
				history.push(AUTH_PREFIX_PATH + `/verification`)
				console.log(response)
				console.log("user added successfuly")
			},
				error => {
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					this.setState({
						successful: false,
						message: resMessage
					});
				}
			);
		setTimeout(() => {
			history.push(`/auth/verification`)
		}, 1000)
	}

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
			<Form form={form} layout="vertical" name="register-form" onFinish={onSignUp}>
				<Form.Item
					name="nom"
					label="Nom"
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />} value={nom} onChange={(e) => setNom(e.target.value)} />
				</Form.Item>
				<Form.Item
					name="prenom"
					label="Prenom"
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />} value={prenom} onChange={(e) => setPrenom(e.target.value)} />
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={rules.email}
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />} value={email} onChange={(e) => setEmail(e.target.value)} />
				</Form.Item>
				<Form.Item
					name="username"
					label="Username"
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />} value={username} onChange={(e) => setUsername(e.target.value)} />
				</Form.Item>
				<Form.Item
					name="cin"
					label="CIN"
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />} value={cin} onChange={(e) => setCin(e.target.value)} />
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={rules.password}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />} value={password} onChange={(e) => setPassword(e.target.value)} />
				</Form.Item>
				{/* <Form.Item
					name="confirm"
					label="ConfirmPassword"
					rules={rules.confirm}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />} />
				</Form.Item> */}
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading} onClick={() => handleRegister()}>
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

const mapStateToProps = ({ auth }) => {
	const { loading, message, showMessage, token, redirect } = auth;
	return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	showAuthMessage,
	hideAuthMessage,
	showLoading,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientRegisterForm)