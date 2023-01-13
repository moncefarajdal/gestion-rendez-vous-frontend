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
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined } from '@ant-design/icons';
import TechnicianService from 'services/TechnicianService'

const { Dragger } = Upload;
const { Option } = Select;
const imageUploadProps = {
	name: 'file',
	  multiple: true,
	  listType: "picture-card",
	  showUploadList: false,
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
  }
  const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices']
const tags = ['Cotton', 'Nike', 'Sales', 'Sports', 'Outdoor', 'Toys', 'Hobbies' ]
const beforeUpload = file => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
	  message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
	  message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
  }
const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'




const ProductForm = props => {

	const { mode = ADD, param } = props

	const [form] = Form.useForm();
	const [username, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [nom, setNom] = useState('')
	const [prenom, setPrenom] = useState('')
	const[reference, setReference]=useState('')
	const[SuccursaleList,setSuccursaleList]=useState([{'nom':'','id':''}])
	const[succursaleName,setSuccursaleName]=useState('')
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
	useEffect(() =>{
        const fetchData = async ()=>{
            const response = await fetch("http://localhost:8090/api/v1/succursale/");
            const newData = await response.json();
            setSuccursaleList(newData);
            console.log(newData);
        };
        fetchData();
    }, []);
	const handleChange = (event) =>{
        setSuccursaleName(event.target.value);
    }


    const saveBtn = (e) => {
        e.preventDefault();
        console.log('username',username);
		console.log('nom',nom);
		console.log('prenom',prenom);
        console.log('succursale',succursaleName);
        console.log('email',email);
		console.log('password',password);
		console.log('reference',reference);

    }
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
							<h2 className="mb-3">{mode === 'ADD' ? 'Add Technician' : `Edit Product`} </h2>
							<div className="mb-3">
								<Button className="mr-2">Discard</Button>
								<Button type="primary"  htmlType="submit" onClick={saveBtn}>
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
					<Input placeholder="Technician FirstName" onChange={(e) => setPrenom(e.target.value)}/>
				</Form.Item>
				<Form.Item name="nom" label="LastName" >
					<Input placeholder="Technician LastName" onChange={(e) => setNom(e.target.value)}/>
				</Form.Item>
				<Form.Item name="Reference" label="Reference" >
					<Input.TextArea rows={4} onChange={(e) => setReference(e.target.value)}/>
				</Form.Item>
			</Card>
			<Card title="Login Credentials">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="email" label="Email" >
						<Input placeholder="Technician Email" onChange={(e) => setEmail(e.target.value)}/>

						</Form.Item>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Form.Item name="password" label="Password" >
						<Input placeholder="Technician Password" onChange={(e) => setPassword(e.target.value)} />

						</Form.Item>
					</Col>
					
				</Row>
			</Card>
		</Col>
		<Col xs={24} sm={24} md={7}>
			<Card title="Media">
				<Dragger {...imageUploadProps} beforeUpload={beforeUpload} onChange={e=> props.handleUploadChange(e)}>
					{
						props.uploadedImg ? 
						<img src={props.uploadedImg} alt="avatar" className="img-fluid" /> 
						: 
						<div>
							{
								props.uploadLoading ? 
								<div>
									<LoadingOutlined className="font-size-xxl text-primary"/>
									<div className="mt-3">Uploading</div>
								</div> 
								: 
								<div>
									<CustomIcon className="display-3" svg={ImageSvg}/>
									<p>Click or drag file to upload</p>
								</div>
							}
						</div>
					}
				</Dragger>
			</Card>
			<Card title="Organization">
				<Form.Item name="category" label="Category" >
					<Select className="w-100" placeholder="Category" value={succursaleName} onChange={handleChange}>
					<option value="">Choose Company Name</option>

                     {SuccursaleList.map(succursale => (
	                <option value={succursale.nom} key={succursale.id} >{succursale.nom}</option>

	            ))
	              }
					</Select>
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
