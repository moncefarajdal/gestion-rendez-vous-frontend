import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import ProductListData from "assets/data/product-list.data.json"
import { Tabs, Button, Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';
import axios from 'axios'
import SuccursaleService from 'services/SuccursaleService'
import save from 'save'
import service from 'auth/FetchInterceptor'
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = props => {

	let history = useHistory()
	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [nom, setName] = useState('')
	const [adresse, setAdress] = useState('')
	const [service, setService] = useState('')
	const [societe, setSociete] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [reference, setReference] = useState('')
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	useEffect(() => {
		if (mode === EDIT) {
			console.log('is edit')
			console.log('props', props)
			const { id } = param
			const produtId = parseInt(id)
			const productData = ProductListData.filter(product => product.id === produtId)
			const product = productData[0]
			form.setFieldsValue({
				comparePrice: 0.00,
				cost: 0.00,
				taxRate: 6,
				description: 'There are many variations of passages of Lorem Ipsum available.',
				category: product.category,
				name: product.name,
				price: product.price
			});
			setImage(product.image)
		}
	}, [form, mode, param, props]);

	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl => {
				setImage(imageUrl)
				setUploadLoading(true)
			});
		}
	};

	const succursale = {
		adresse: adresse,
		nom: nom,
		chef: {
			email: email,
			username: username
		},
		service: {
			reference: reference
		}
	}

	console.log(succursale)

	const saveSuccursale = () => {
		SuccursaleService.saveSuccursale(succursale)
			.then((response) => {
				if (response.data == -1) message.error(`Une succursale avec ce nom existe deja`)
				else if (response.data == -2) message.error(`Veuillez saisir le nom de la succursale`)
				else if (response.data == -4) message.error(`Veuillez saisir le chef de la succursale`)
				else {
					console.log(response);
					message.success(`Succursale saved`);
				}
			}).catch(error => {
				console.log(error)
			})
	}

	const headBack = () => {
		history.push(`/app/super-admin/succursale/list-succursale`)
	}

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD) {
					message.success(`Created ${values.name} to product list`);
				}
				if (mode === EDIT) {
					message.success(`Product saved`);
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};
	function handleSave() {
		saveSuccursale(service, nom, adresse, societe).then(response => {
			console.log("success")
		});

	};

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New Succursale' : `Edit Product`} </h2>
							<div className="mb-3">
								<Button className="mr-2" onClick={() => headBack()}>Discard</Button>
								<Button type="primary" onClick={() => saveSuccursale()} htmlType="submit" >
									{mode === 'ADD' ? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
						<TabPane tab="General" key="1">
							<Row gutter={16}>
								<Col xs={24} sm={24} md={17}>
									<Card title="Basic Info">
										<Form.Item name="nom" label="Name" >
											<Input placeholder="Succursale Name" onChange={(e) => setName(e.target.value)} />
										</Form.Item>
										<Form.Item name="service" label="Service" >
											<Input placeholder="Succursale Service" />
										</Form.Item>
										<Form.Item name="adresse" label="Adress" >
											<Input placeholder="Succursale Adress" onChange={(e) => setAdress(e.target.value)} />
										</Form.Item>
										<Form.Item name="societe" label="Societe" >
											<Input placeholder="Succursale Adress" onChange={(e) => setSociete(e.target.value)} />
										</Form.Item>
									</Card>
								</Col>
							</Row>
						</TabPane>
						<TabPane tab="Admin" key="2">
							<Row gutter={16}>
								<Col xs={24} sm={24} md={17}>
									<Card title="Admin">
										<Form.Item name="email" label="Email">
											<Input placeholder="Admin Email" onChange={(e) => setEmail(e.target.value)} />
										</Form.Item>
										<Form.Item name="username" label="Username">
											<Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
										</Form.Item>
									</Card>
								</Col>
							</Row>
						</TabPane>
						<TabPane tab="Service" key="3">
							<Row gutter={16}>
								<Col xs={24} sm={24} md={17}>
									<Card title="Service">
										<Form.Item name="service" label="Service Name">
											<Input placeholder="Service Name" onChange={(e) => setService(e.target.value)} />
										</Form.Item>
										<Form.Item name="reference" label="Reference">
											<Input placeholder="Reference" onChange={(e) => setReference(e.target.value)} />
										</Form.Item>
									</Card>
								</Col>
							</Row>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default ProductForm
