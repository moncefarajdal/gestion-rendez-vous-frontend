import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import ProductListData from "assets/data/product-list.data.json"
import { Tabs, Button, Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';
import axios from 'axios'
import SuccursaleService from 'services/SuccursaleService'
import AdminService from 'services/AdminService';
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
	const [nom, setFirstName] = useState('')
    const [prenom, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
	const [codePostal, setCodePostal] = useState('')
    const [password,setPassword]=useState('')
    const [type, setType] = useState('admin')
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

	const saveAdmin = () => {
		AdminService.saveAdmin({ prenom,nom,username,type,email,password,codePostal }).then((response) => {
			console.log(response);
			message.success(`User saved`);
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
		saveAdmin(nom,prenom,email,password,type,codePostal).then(response => {
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
							<h2 className="mb-3">{mode === 'ADD' ? 'Add New Admin' : `Edit Product`} </h2>
							<div className="mb-3">
								<Button className="mr-2" onClick={() => headBack()}>Discard</Button>
								<Button type="primary" onClick={() => saveAdmin()} htmlType="submit" >
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
										<Form.Item name="prenom" label="FirstName" >
											<Input placeholder="Admin FirstName" onChange={(e) => setFirstName(e.target.value)} />
										</Form.Item>
										<Form.Item name="nom" label="LastName" >
											<Input placeholder="Admin LastName" onChange={(e) => setLastName(e.target.value)} />
										</Form.Item>
										<Form.Item name="code_postal" label="ZIP" >
											<Input placeholder="ZIP Code" onChange={(e) => setCodePostal(e.target.value)} />
										</Form.Item>
									
                                        <Input type="hidden" placeholder="User Type" onChange={(e) => setType('admin')} />



									</Card>
                                    <Card title="Login Credentials">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="email" label="Email" >
						<Input placeholder="Admin Email" onChange={(e) => setEmail(e.target.value)}/>

						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="password" label="Password" >
						<Input placeholder="Admin Password" onChange={(e) => setPassword(e.target.value)} />

						</Form.Item>
					</Col>
                    <Col xs={24} sm={24} md={12}>
						<Form.Item name="username" label="Username" >
						<Input placeholder="Admin Username" onChange={(e) => setUsername(e.target.value)} />

						</Form.Item>
					</Col>

                   
					
				</Row>
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
