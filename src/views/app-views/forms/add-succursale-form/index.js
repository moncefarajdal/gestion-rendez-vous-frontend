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

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

function saveSuccursale(adresse, nom, service, societe) {
	return axios.post("http://localhost:8090/api/v1/succursale/", {
		adresse,
		nom,
		service,
		societe
	});

}


const ProductForm = props => {

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [nom, setName] = useState('')
	const [adresse, setAdress] = useState('')
	const [service, setService] = useState('')
	const [societe, setSociete] = useState('')
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


	// const handleClick =(e)=>{
	// 	e.preventDefault()
	// 	axios.post("http://localhost:8090/api/v1/succursale/",{adresse,nom,service,societe}, {
	// 		headers: {
	// 		  Accept: "application/json",
	// 		  "Content-Type": "application/json;charset=UTF-8",
	// 		},
	// 	  }).then(()=>{
	// 		console.log("success")
	// 	});



	// };

	const saveSuccursale = () => {
		SuccursaleService.saveSuccursale({ adresse, nom }).then((response) => {
			console.log(response);
		}).catch(error => {
			console.log(error)
		})
		// axios.post("http://localhost:8090/api/v1/succursale/", { adresse, nom }).then(response => console.log(response))
		// console.log({ adresse, nom })
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
								<Button className="mr-2">Discard</Button>
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
											<Input placeholder="Succursale Service" onChange={(e) => setService(e.target.value)} />
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

					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default ProductForm
